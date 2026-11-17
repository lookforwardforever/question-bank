package com.zihan.questionbank;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends Activity {

    private static final int REQ_EXPORT = 1001;
    private static final int REQ_IMPORT = 1002;
    private static final int MAX_IMPORT_BYTES = 5 * 1024 * 1024;

    private WebView webView;
    private View splashView;
    private boolean splashHidden = false;
    private String pendingExport;
    private long lastBackPress = 0L;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        setContentView(R.layout.activity_main);

        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.parseColor("#F5F7FB"));
        WindowInsetsControllerCompat controller =
                WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true);
        controller.setAppearanceLightNavigationBars(true);

        View root = findViewById(R.id.root);
        ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            v.setPadding(0, bars.top, 0, Math.max(bars.bottom, ime.bottom));
            return insets;
        });

        splashView = findViewById(R.id.splash);
        webView = findViewById(R.id.webView);
        configureWebView(webView);
        webView.addJavascriptInterface(new AndroidBridge(), "QBAndroid");
        webView.loadUrl("file:///android_asset/index.html");
    }

    @SuppressLint("SetJavaScriptEnabled")
    @SuppressWarnings("deprecation")
    private void configureWebView(WebView view) {
        WebSettings settings = view.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(false);
        settings.setAllowFileAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setAllowContentAccess(false);
        settings.setBlockNetworkLoads(true);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setTextZoom(100);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setGeolocationEnabled(false);
        settings.setSaveFormData(false);

        view.setBackgroundColor(Color.parseColor("#F5F7FB"));
        view.setOverScrollMode(View.OVER_SCROLL_NEVER);

        view.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView wv, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri == null ? "" : uri.getScheme();
                if ("file".equals(scheme)) return false;
                if ("http".equals(scheme) || "https".equals(scheme)) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    } catch (Exception ignored) {
                    }
                    return true;
                }
                return true;
            }

            @Override
            public void onPageFinished(WebView wv, String url) {
                hideSplash();
            }

            @Override
            public void onReceivedError(WebView wv, WebResourceRequest request, WebResourceError error) {
                if (request != null && request.isForMainFrame()) {
                    hideSplash();
                    Toast.makeText(MainActivity.this, "页面加载失败，请重新打开应用", Toast.LENGTH_LONG).show();
                }
            }
        });

        view.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView wv, String url, String message, final JsResult result) {
                new AlertDialog.Builder(MainActivity.this)
                        .setMessage(message)
                        .setPositiveButton("确定", (dialog, which) -> result.confirm())
                        .setOnCancelListener(dialog -> result.cancel())
                        .show();
                return true;
            }

            @Override
            public boolean onJsConfirm(WebView wv, String url, String message, final JsResult result) {
                new AlertDialog.Builder(MainActivity.this)
                        .setMessage(message)
                        .setPositiveButton("确定", (dialog, which) -> result.confirm())
                        .setNegativeButton("取消", (dialog, which) -> result.cancel())
                        .setOnCancelListener(dialog -> result.cancel())
                        .show();
                return true;
            }

            @Override
            public boolean onJsPrompt(WebView wv, String url, String message, String defaultValue, JsPromptResult result) {
                result.cancel();
                return true;
            }
        });
    }

    private void hideSplash() {
        if (splashHidden) return;
        splashHidden = true;
        if (splashView == null) return;
        splashView.animate()
                .alpha(0f)
                .setDuration(180)
                .withEndAction(() -> splashView.setVisibility(View.GONE))
                .start();
    }

    private void toast(final String message) {
        runOnUiThread(() -> Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show());
    }

    public class AndroidBridge {
        @JavascriptInterface
        public boolean available() {
            return true;
        }

        @JavascriptInterface
        public void exportProgress(final String json, final String filename) {
            runOnUiThread(() -> {
                if (json == null || json.trim().isEmpty()) {
                    toast("没有可导出的数据");
                    return;
                }
                pendingExport = json;
                try {
                    Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.setType("application/json");
                    intent.putExtra(Intent.EXTRA_TITLE,
                            filename == null || filename.trim().isEmpty()
                                    ? "quiz-progress.json" : filename);
                    startActivityForResult(intent, REQ_EXPORT);
                } catch (Exception e) {
                    pendingExport = null;
                    toast("无法打开保存位置");
                }
            });
        }

        @JavascriptInterface
        public void importProgress() {
            runOnUiThread(() -> {
                try {
                    Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.setType("application/json");
                    startActivityForResult(intent, REQ_IMPORT);
                } catch (Exception e) {
                    toast("无法打开文件选择器");
                }
            });
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQ_EXPORT) {
            if (resultCode != RESULT_OK || data == null || data.getData() == null || pendingExport == null) {
                pendingExport = null;
                return;
            }
            Uri uri = data.getData();
            try (OutputStream out = getContentResolver().openOutputStream(uri, "wt")) {
                if (out == null) throw new IllegalStateException("no stream");
                out.write(pendingExport.getBytes(StandardCharsets.UTF_8));
                out.flush();
                toast("进度已导出");
            } catch (Exception e) {
                toast("导出失败");
            } finally {
                pendingExport = null;
            }
            return;
        }

        if (requestCode == REQ_IMPORT) {
            if (resultCode != RESULT_OK || data == null || data.getData() == null) return;
            Uri uri = data.getData();
            try (InputStream in = getContentResolver().openInputStream(uri)) {
                if (in == null) throw new IllegalStateException("no stream");
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                byte[] chunk = new byte[8192];
                int read;
                int total = 0;
                while ((read = in.read(chunk)) != -1) {
                    total += read;
                    if (total > MAX_IMPORT_BYTES) throw new IllegalStateException("too large");
                    buffer.write(chunk, 0, read);
                }
                String text = buffer.toString(StandardCharsets.UTF_8.name());
                final String script = "window.QB_IMPORT(" + JSONObject.quote(text) + ");";
                runOnUiThread(() -> webView.evaluateJavascript(script, null));
            } catch (Exception e) {
                toast("导入失败：文件读取错误");
            }
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        long now = System.currentTimeMillis();
        if (now - lastBackPress < 2000) {
            super.onBackPressed();
        } else {
            lastBackPress = now;
            toast("再按一次退出");
        }
    }

    @Override
    protected void onPause() {
        if (webView != null) webView.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.loadUrl("about:blank");
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}

package com.sudharsan.odin;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;

import org.json.JSONObject;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "ODIN-FCM";
    private static final String REGISTER_ENDPOINT = "https://x3esrtgf8i.execute-api.ap-south-1.amazonaws.com/prod/register-device";
    private static final String INSIGHTS_ENDPOINT = "https://x3esrtgf8i.execute-api.ap-south-1.amazonaws.com/prod/insights";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initialize Firebase
        FirebaseApp.initializeApp(this);

        // Load Capacitor
        load();

        // Fetch FCM token
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(task -> {
                if (!task.isSuccessful()) {
                    Log.w(TAG, "❌ FCM token fetch failed", task.getException());
                    return;
                }

                String token = task.getResult();
                Log.d(TAG, "✅ New FCM Token: " + token);

                // Register device once
                new Thread(() -> registerDevice(token)).start();

                // Trigger push notifications immediately
                new Thread(this::callInsightsLambda).start();
            });
    }

    private void registerDevice(String token) {
        try {
            JSONObject json = new JSONObject();
            json.put("deviceId", "odin-" + System.currentTimeMillis());
            json.put("fcmToken", token);

            URL url = new URL(REGISTER_ENDPOINT);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            OutputStream os = conn.getOutputStream();
            os.write(json.toString().getBytes("UTF-8"));
            os.close();

            int responseCode = conn.getResponseCode();
            Log.d(TAG, "📡 Device registered! Response code: " + responseCode);
        } catch (Exception e) {
            Log.e(TAG, "🔥 Error registering device", e);
        }
    }

    private void callInsightsLambda() {
        try {
            URL url = new URL(INSIGHTS_ENDPOINT);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            int responseCode = conn.getResponseCode();
            Log.d(TAG, "📈 Insights Lambda triggered. Response: " + responseCode);
        } catch (Exception e) {
            Log.e(TAG, "🔥 Error calling insights", e);
        }
    }
}


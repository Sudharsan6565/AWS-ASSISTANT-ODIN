package com.sudharsan.odin;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {
    // 🧠 This handles push when app is in foreground
    if (remoteMessage.getNotification() != null) {
      showNotification(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody());
    }
  }

  private void showNotification(String title, String messageBody) {
    Intent intent = new Intent(this, BridgeActivity.class);
    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
    PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent,
      PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_IMMUTABLE);

    String channelId = "odin_channel";
    Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

    NotificationCompat.Builder notificationBuilder =
      new NotificationCompat.Builder(this, channelId)
        .setSmallIcon(com.sudharsan.odin.R.drawable.ic_stat_ic_notification)
        .setContentTitle(title)
        .setContentText(messageBody)
        .setAutoCancel(true)
        .setSound(defaultSoundUri)
        .setContentIntent(pendingIntent);

    NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel channel = new NotificationChannel(channelId, "ODIN Notifications", NotificationManager.IMPORTANCE_HIGH);
      notificationManager.createNotificationChannel(channel);
    }

    notificationManager.notify(0, notificationBuilder.build());
  }
}


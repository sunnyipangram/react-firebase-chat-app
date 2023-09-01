
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAVIH8abVoJeUkyCZcpDGG1Nt0uxuuyaN4",
  authDomain: "chat-application-e17ce.firebaseapp.com",
  projectId: "chat-application-e17ce",
  storageBucket: "chat-application-e17ce.appspot.com",
  messagingSenderId: "111563787956",
  appId: "1:111563787956:web:f55d4f5a2809330d9b11e1",
  measurementId: "G-LCLDTM06JX"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
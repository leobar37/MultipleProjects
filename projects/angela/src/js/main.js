const firebaseConfig = {
  apiKey: "AIzaSyCQDXfyOlyGA3d6O7Tw4x7GlZLo934Z3pM",
  authDomain: "login-app-81869.firebaseapp.com",
  databaseURL: "https://login-app-81869.firebaseio.com",
  projectId: "login-app-81869",
  storageBucket: "login-app-81869.appspot.com",
  messagingSenderId: "244497162005",
  appId: "1:244497162005:web:95748e9c31a6ec0674d31c",
  measurementId: "G-W235VE2BJZ",
};

function getValuInput(name) {
  const input = Object.assign([], document.querySelectorAll("input")).find(
    (input) => input.name === name
  );
  return input.value ? input.value : null;
}
function getUser() {
  const email = getValuInput("email");
  const password = getValuInput("password");
  const repeatpassword = getValuInput("repeatpassword");
  const isEqualPassword = password == repeatpassword;
  if (!isEqualPassword) {
    Swal.fire({
      title: "Error!",
      text: "password not match",
      icon: "error",
      confirmButtonText: "ok",
    });
    throw new Error("password not match");
  }
  const user = {
    email,
    password,
  };
  return user;
}

firebase.initializeApp(firebaseConfig);

document.getElementById("sendButton").addEventListener("click", () => {
  try {
    const user = getUser();
    if (user)
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((data) => {
          console.log(data);
        });
  } catch (error) {
    console.log(error);
  }
});

document.querySelectorAll(".social a").forEach((el) => {
  el.addEventListener("click", () => {
    const provider = el.dataset.provider;
    let provide = null;
    switch (provider) {
      case "facebook": {
        provide = new firebase.auth.FacebookAuthProvider();
        break;
      }
      case "google": {
        provide = new firebase.auth.GoogleAuthProvider();
        break;
      }
      case "github": {
        provide = new firebase.auth.GithubAuthProvider();
        break;
      }
      default: {
        provide = null;
        break;
      }
    }

    if (provide !== null) {
      console.log(provide);
      firebase
        .auth()
        .signInWithPopup(provide)
        .then((data) => {
          console.log(data);
        });
    }
  });
});

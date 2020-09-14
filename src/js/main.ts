declare var $;
$(document).ready(function () {
  let generrateText = () => {
    let cont = 0;
    let creadores = "Create by: Jhonatan, Roberto , Axel, Omar , ELmer";
    document.getElementById("creadores").innerHTML += creadores.charAt(cont);
    let generate = () => {
      cont++;
      if (cont < creadores.length) {
        setTimeout(() => {
          document.getElementById("creadores").innerHTML += creadores.charAt(
            cont
          );
          generate();
        }, 50);
      }
    };
    generate();
  };
  let recSecuece = () => {
    let rec = $(".rectangulo");
    rec.velocity("reverse");
    let secuence = [
      { elements: rec, properties: { top: "10%" } },
      { elements: rec, properties: { top: "40%" } },
      { elements: rec, properties: { top: "100%" } },
      { elements: rec, properties: { top: "50%" } },
      {
        elements: rec,
        properties: { top: "10%" },
        options: {
          complete: () => {
            infiniteRect();
          },
        },
      },
    ];

    $.Velocity.RunSequence(secuence);
  };

  const infiniteRect = () => {
    $(".rectangulo")
      .velocity({ rotateZ: "+10" }, { duration: 100 })
      .velocity({ rotateZ: "+20" }, { duration: 100 })
      .velocity({ rotateZ: "+30" }, { duration: 100 })
      .velocity({ rotateZ: "+40" }, { duration: 100 })
      .velocity({ rotateZ: "+50" }, { duration: 100 })
      .velocity({ rotateZ: "+60" }, { duration: 100 })
      .velocity({ rotateZ: "+70" }, { duration: 100 })
      .velocity({ rotateZ: "+80" }, { duration: 100 })
      .velocity({ rotateZ: "+100" }, { duration: 100 })
      .velocity({ rotateZ: "+150" }, { duration: 100 })
      .velocity({ rotateZ: "+180" }, { duration: 100 });
  };

  let textSecuence = () => {
    let texto = $(".texto");
    let secuence2 = [
      { elements: texto, properties: { width: "40%" } },
      { elements: texto, properties: { width: "30%" } },
      { elements: texto, properties: { width: "20%" } },
      { elements: texto, properties: { width: "30%" } },
      { elements: texto, properties: { width: "40%" } },
      { elements: texto, properties: { width: "50%" } },
      {
        elements: texto,
        properties: { width: "60%" },
        options: {
          complete: () => {
            generrateText();
            recSecuece();
            infiniteRect();
          },
        },
      },
    ];
    $.Velocity.RunSequence(secuence2);
  };
  let body = $("body");
  let secuence = [
    { elements: body, properties: { width: "10%" } },
    { elements: body, properties: { width: "30%" } },
    { elements: body, properties: { width: "50%" } },
    { elements: body, properties: { width: "100%" } },
    {
      elements: body,
      properties: { height: "100%", top: 0 },
      options: {
        complete: () => {
          $(".wrap").velocity(
            {
              opacity: 1,
            },
            { duration: 300 }
          );
          let title = "welcome 😃";
          document.getElementById("title").textContent = title;
          $("#title").velocity("transition.flipBounceXIn");
          textSecuence();
        },
      },
    },
  ];
  $.Velocity.RunSequence(secuence);
});

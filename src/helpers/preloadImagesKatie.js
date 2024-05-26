const freeTraining = () => {};
const lookupProperty = () => {};

function preloadImages(test = false) {
  document.getElementById("btnStartMemoCountdown").innerText =
    "Loading images... Please wait";
  document
    .getElementById("btnStartMemoCountdown")
    .classList.remove("glowButton");

  let preloading = true;
  let amount;
  if (freeTraining()) {
    amount = Number(document.getElementById("inpAmount").value);
  } else {
    amount = lookupProperty("5I", "amount");
  }

  let imageArray = [];
  let actualImageArray = [];
  //get the images
  var imageURL;
  var num;
  var ext;
  if (!test && competitionMode && !competitionTestMode && preloadAll) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "Data_" + compName + "/Images/images.txt", true);
    rawFile.onload = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var imagesText = rawFile.responseText;

          imagesText.trim();
          var txtArray = imagesText.split("\r\n");

          for (var i = 0; i < amount + 1; i++) {
            if (txtArray[i][0] === "[") {
              //The last item is the shuffle order
              answerArray = [];
              var shuffleOrder = JSON.parse(txtArray[i]);

              answerArray = shuffleOrder.slice();

              //Make a shuffled image list object by arranging imageArray in that order
              /*
                                for(i= 0; i<shuffleOrder.length; i++){
                                next= shuffleOrder[i];
                                answerArray.push(imageArray[next]);
                                }  */

              //save it

              localStorage.setItem("answerArray", JSON.stringify(answerArray));

              break;
            } else if (txtArray[i] !== "") {
              imageArray.push(txtArray[i]);
            }
          }

          localStorage.setItem("imageArray", JSON.stringify(imageArray));

          //if organiser didn't provide enough images, change the amount
          if (competitionMode && !test && !competitionTestMode)
            amount = imageArray.length;

          //preload images
          var imagesLoaded = 0;
          for (let im = 0; im < amount; im++) {
            actualImageArray[im] = new Image();
            actualImageArray[im].src = "IAM Images/" + imageArray[im];
            actualImageArray[im].onload = function () {
              console.log(++imagesLoaded);

              document.getElementById("btnStartMemoCountdown").innerText =
                "Loading images: " + (imagesLoaded + 1) + " of " + amount;

              if (imagesLoaded == amount) {
                document
                  .getElementById("btnStartMemoCountdown")
                  .removeAttribute("disabled");

                document.getElementById("btnStartMemoCountdown").innerText =
                  "Start";

                document
                  .getElementById("btnStartMemoCountdown")
                  .classList.add("glowButton");

                document.getElementById("btnPreload").innerText =
                  "Preload data";

                localStorage.setItem(
                  "preloadedData",
                  JSON.stringify(imageArray)
                );
                preloaded = true;
              }
            };
          }
        }
      }
    };
    rawFile.send(null);

    //**** ? 2018-10-12
    /*
                for (i = 0; i < amount; i++) {

                imageArray.push("Image (" + i + ").png");


                }  */
  } else {
    for (let i = 0; i < amount; i++) {
      //uncoment these lines if duplicates are allowed on different rows
      //      if (i % 5 == 0) {
      //          usedImageNums = [];
      //      }
      num = Math.floor(Math.random() * (numberOfPngs + numberOfJpgs)) + 1;
      while (usedImageNums.indexOf(num) > -1) {
        num = Math.floor(Math.random() * (numberOfPngs + numberOfJpgs)) + 1;
      }
      usedImageNums.push(num);
      if (num > numberOfPngs) {
        ext = "jpg";
        num -= numberOfPngs;
      } else {
        ext = "png";
      }
      imageURL = "Image (" + num + ")." + ext;
      imageArray.push(imageURL);
    }

    //shuffle the images
    shuffle(imageArray);

    localStorage.setItem("imageArray", JSON.stringify(imageArray));

    //preload images
    var imagesLoaded = 0;
    for (let im = 0; im < amount; im++) {
      actualImageArray[im] = new Image();
      actualImageArray[im].src = "IAM Images/" + imageArray[im];
      actualImageArray[im].onload = function () {
        if (!test) {
          console.log(++imagesLoaded + " " + preloading + " test: " + test);

          document.getElementById("btnStartMemoCountdown").innerText =
            "Loading images: " + (imagesLoaded + 1) + " of " + amount;
          if (imagesLoaded == amount && preloading && !test) {
            //      startMemoCountdown();
            if (competitionMode)
              document.getElementById("btnPreload").style.display = "none";

            document.getElementById("btnStartMemoCountdown").innerText =
              "Start";

            document
              .getElementById("btnStartMemoCountdown")
              .removeAttribute("disabled");

            document
              .getElementById("btnStartMemoCountdown")
              .classList.add("glowButton");
            preloaded = true;

            localStorage.setItem("preloadedData", JSON.stringify(imageArray));
          }
        }
      };
    }
  }
}

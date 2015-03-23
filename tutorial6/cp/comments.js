/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 6
   Case Problem 1

   Author:  Kevin McCarthy
   Date:    3/22/15

   Filename: comments.js


   Global Variables:
  
   maxlength
      The maximum length allowed in the textarea box

   Functions List:

   init()
      Initializes the contents of the Web page. Creates
      event handlers for the keypress and keyup events.

   countText()
      Returns the number of a non-whitespace characters
      in the textarea box.

   checkLength(e)
      Verifies the number of non-whitespace characters
      in the textarea box is less than maxlength. Keeps
      user from entering a character that would exceed
      maxlength

   updateCount(e)
      Updates the count of characters in the wordcount
      box.


      */

      var maxLength = 500;
      // var currentCount = 0;

      // console.log( window.event.keyCode );


      window.onload = init;

      function init() {

         commentBox = document.getElementById("comment");
         countBox = document.getElementById("wordcount");

         countBox.value = "0/" + maxLength;

         commentBox.onkeydown = checkLength;
         commentBox.onkeyup = updateCount;

      }

      function countText() {
         commentBox = document.getElementById("comment");
         countBox = document.getElementById("wordcount");
         commentregex = /\s/g;

         commentText = commentBox.value.replace(commentregex, '');

         return commentText.length;
      }

      function checkLength(e) {
         var evt = e || window.event;

         if (countText() < maxLength) { return true; }
         else if ( evt.keyCode == 8 || evt.keyCode == 46 ) { return true; }
         else { return false; }
      }

      function updateCount(e) {
         countBox = document.getElementById("wordcount");
         currentCount = countText();
         countBox.value = currentCount + "/" + maxLength;

         if (currentCount < maxLength) {
            commentBox.style.backgroundColor = "white";
            commentBox.style.color = "black";
         } else {
            commentBox.style.backgroundColor = "red";
            commentBox.style.color = "white";
         }

      }




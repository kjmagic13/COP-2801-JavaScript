/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 10
   Tutorial Case

   Author: Kevin McCarthy  
   Date: 2/2/2015   


   Filename: status.js


   Functions List:

   initPage()
      Change the status bar message displayed by the browser
      and prevents the page from appearing within a frame

      */



      addEvent(window, "load", initPage, false);

      function initPage() {
         window.defaultStatus = "Welcome to iMusicHistory.com";

         if (top.location.href = self.location.href) {
            top.location.href = self.location.href;
         }
      }
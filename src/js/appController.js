/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcontext', 'jquery', 'mentionsDemo', 'ojs/ojarraydataprovider', 'ojs/ojhtmlutils', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'knockout', 'ojs/ojknockout', 'ckeditor4'],
  function (Context, $, mentionsDemo, ArrayDataProvider, HtmlUtils, ResponsiveUtils, ResponsiveKnockoutUtils, ko) {

    function ControllerViewModel() {

      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      this.userLogin = ko.observable("john.hancock@oracle.com");

      var self = this;

      var url = "js/existingComments.json";  //defines link to local data file
      self.avatarBaseUrl = "https://ckeditor.com/docs/ckeditor4/4.16.0/examples/assets/mentions/img/";
      self.newCommentsContent = '<p><a href="mailto:ajames@example.com">@ajames</a>&nbsp;Please <strong>review</strong> comments above!😀</p><p> </p>';

      self.mappedCommentsList = ko.observableArray([]);  //gets data for Activities list

      self.mapComments = comments =>  ({
        ...comments,
        authorAvatarUrl: self.avatarBaseUrl + comments.authorAvatarUrl,
        // commentsDOM: {
        //   view: HtmlUtils.stringToNodeArray(comments.commentsContent),
        //   data: {

        //   },
        // }
      });

      self.mapCommentsList = data => {
        let mappedData = data.map(
          comments => self.mapComments(comments)
        );
        mappedData.forEach(element => {
          self.mappedCommentsList.push(element);
        });
      }

      $.getJSON(url).then(function (data) {
        self.commentsList = data;
        self.mapCommentsList(self.commentsList);
      });

      // Footer
      this.footerLinks = [
        { name: 'About Oracle', linkId: 'aboutOracle', linkTarget: 'http://www.oracle.com/us/corporate/index.html#menu-about' },
        { name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" },
        { name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" },
        { name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" },
        { name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" },
      ];

      // self.updateComments = function (newValue) {
      //   self.newComments(newValue);
      // };
  
      self.mentionsDemo = mentionsDemo;
      self.mentionsDemo.setComments(self.newCommentsContent);
  
      self.saveComments = (event,data, context) => {
        // let obj = data;
        self.newCommentsContent = self.mentionsDemo.getComments();
        let newComments = {
          id: self.commentsList.length + 1,
          "authorAvatarUrl": "m_4.jpg",
          "authorName": "John Hancock",
          "authorEmail": "john.hancock@oracle.com",
          "username": "user2",
          "commentsTime": "just now",
          "commentsContent": self.newCommentsContent,
        };
        self.commentsList.push(newComments);
        self.mappedCommentsList.push(self.mapComments(newComments));
        self.mentionsDemo.setComments("<p></p>");
      };
  
    }

    // release the application bootstrap busy state
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();

    return new ControllerViewModel();
  }
);

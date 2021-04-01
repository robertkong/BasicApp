define(['ckeditor4', 'text!users.json','text!tags.json' ], function (CKLoader, usersStr, tagsStr) {
  function MentionsDemo() {
    let users = JSON.parse(usersStr);
    let tags = JSON.parse(tagsStr);

    CKEDITOR.replace('editor1', {
      startupFocus : 'end',
      plugins: 'mentions,emoji,basicstyles,undo,link,wysiwygarea,toolbar,sourcedialog',
      extraPlugins: 'sourcedialog',
      // removePlugins: 'sourcearea',
      // contentsCss: [
      //   'http://cdn.ckeditor.com/4.16.0/full-all/contents.css',
      //   'https://ckeditor.com/docs/vendors/4.16.0/ckeditor/contents.css'
      // ],
      height: 150,
      // toolbar: [{
      //   name: 'document',
      //   items: ['Undo', 'Redo']
      // },
      // {
      //   name: 'basicstyles',
      //   items: ['Bold', 'Italic', 'Strike']
      // },
      // {
      //   name: 'links',
      //   items: ['EmojiPanel', 'Link', 'Unlink']
      // }
      // ],
      mentions: [{
        feed: dataFeed,
        itemTemplate: '<li data-id="{id}">' +
          '<img class="photo" src="https://ckeditor.com/docs/ckeditor4/4.16.0/examples/assets/mentions/img/{avatar}.jpg" />' +
          '<strong class="username">{username}</strong>' +
          '<span class="fullname">{fullname}</span>' +
          '</li>',
        outputTemplate: '<a href="mailto:{username}@example.com">@{username}</a><span>&nbsp;</span>',
        minChars: 0
      },
      {
        feed: tags,
        marker: '#',
        itemTemplate: '<li data-id="{id}"><strong>{name}</strong></li>',
        outputTemplate: '<a href="https://example.com/social?tag={name}">{name}</a><span>&nbsp;</span>',
        minChars: 1
      }
      ]
    });

    function dataFeed(opts, callback) {
      var matchProperty = 'username',
        data = users.filter(function (item) {
          return item[matchProperty].indexOf(opts.query.toLowerCase()) >= 0;
        });

      data = data.sort(function (a, b) {
        return a[matchProperty].localeCompare(b[matchProperty], undefined, {
          sensitivity: 'accent'
        });
      });

      callback(data);
    }

    this.getComments = () => {
      return CKEDITOR.instances.editor1.getData();
    };

    this.setComments = (data) => {
      return CKEDITOR.instances.editor1.setData(data);
    };

    CKEDITOR.instances.editor1.focus();
  }

  return new MentionsDemo();
}
);



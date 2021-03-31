define(['ckeditor4'], function (CKLoader) {
  function MentionsDemo() {

    var users = [{
      id: 1,
      avatar: 'm_1',
      fullname: 'Charles Flores',
      username: 'cflores'
    },
    {
      id: 2,
      avatar: 'm_2',
      fullname: 'Gerald Jackson',
      username: 'gjackson'
    },
    {
      id: 3,
      avatar: 'm_3',
      fullname: 'Wayne Reed',
      username: 'wreed'
    },
    {
      id: 4,
      avatar: 'm_4',
      fullname: 'Louis Garcia',
      username: 'lgarcia'
    },
    {
      id: 5,
      avatar: 'm_5',
      fullname: 'Roy Wilson',
      username: 'rwilson'
    },
    {
      id: 6,
      avatar: 'm_6',
      fullname: 'Matthew Nelson',
      username: 'mnelson'
    },
    {
      id: 7,
      avatar: 'm_7',
      fullname: 'Randy Williams',
      username: 'rwilliams'
    },
    {
      id: 8,
      avatar: 'm_8',
      fullname: 'Albert Johnson',
      username: 'ajohnson'
    },
    {
      id: 9,
      avatar: 'm_9',
      fullname: 'Steve Roberts',
      username: 'sroberts'
    },
    {
      id: 10,
      avatar: 'm_10',
      fullname: 'Kevin Evans',
      username: 'kevans'
    },

    {
      id: 11,
      avatar: 'w_1',
      fullname: 'Mildred Wilson',
      username: 'mwilson'
    },
    {
      id: 12,
      avatar: 'w_2',
      fullname: 'Melissa Nelson',
      username: 'mnelson'
    },
    {
      id: 13,
      avatar: 'w_3',
      fullname: 'Kathleen Allen',
      username: 'kallen'
    },
    {
      id: 14,
      avatar: 'w_4',
      fullname: 'Mary Young',
      username: 'myoung'
    },
    {
      id: 15,
      avatar: 'w_5',
      fullname: 'Ashley Rogers',
      username: 'arogers'
    },
    {
      id: 16,
      avatar: 'w_6',
      fullname: 'Debra Griffin',
      username: 'dgriffin'
    },
    {
      id: 17,
      avatar: 'w_7',
      fullname: 'Denise Williams',
      username: 'dwilliams'
    },
    {
      id: 18,
      avatar: 'w_8',
      fullname: 'Amy James',
      username: 'ajames'
    },
    {
      id: 19,
      avatar: 'w_9',
      fullname: 'Ruby Anderson',
      username: 'randerson'
    },
    {
      id: 20,
      avatar: 'w_10',
      fullname: 'Wanda Lee',
      username: 'wlee'
    }
    ],
      tags = [
        'american',
        'asian',
        'baking',
        'breakfast',
        'cake',
        'caribbean',
        'chinese',
        'chocolate',
        'cooking',
        'dairy',
        'delicious',
        'delish',
        'dessert',
        'desserts',
        'dinner',
        'eat',
        'eating',
        'eggs',
        'fish',
        'food',
        'foodgasm',
        'foodie',
        'foodporn',
        'foods',
        'french',
        'fresh',
        'fusion',
        'glutenfree',
        'greek',
        'grilling',
        'halal',
        'homemade',
        'hot',
        'hungry',
        'icecream',
        'indian',
        'italian',
        'japanese',
        'keto',
        'korean',
        'lactosefree',
        'lunch',
        'meat',
        'mediterranean',
        'mexican',
        'moroccan',
        'nom',
        'nomnom',
        'paleo',
        'poultry',
        'snack',
        'spanish',
        'sugarfree',
        'sweet',
        'sweettooth',
        'tasty',
        'thai',
        'vegan',
        'vegetarian',
        'vietnamese',
        'yum',
        'yummy'
      ];

    CKEDITOR.replace('editor1', {
      plugins: 'mentions,emoji,basicstyles,undo,link,wysiwygarea,toolbar',
      // contentsCss: [
      //   'http://cdn.ckeditor.com/4.16.0/full-all/contents.css',
      //   'https://ckeditor.com/docs/vendors/4.16.0/ckeditor/contents.css'
      // ],
      height: 150,
      toolbar: [{
        name: 'document',
        items: ['Undo', 'Redo']
      },
      {
        name: 'basicstyles',
        items: ['Bold', 'Italic', 'Strike']
      },
      {
        name: 'links',
        items: ['EmojiPanel', 'Link', 'Unlink']
      }
      ],
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
  }

  return new MentionsDemo();
}
);



$(document).ready(function () {
  $('#error').hide();
  $('#error2').hide();
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const createTweetElement = function (tweet) {
    const $tweet = $(`
    <article class="tweets">
      <header>
          <div class="displayUsername">
            <span>
              <i class="fa-regular fa-user"></i>
              ${tweet.user.name}
            </span>
            <h3 style="color: grey;">${tweet.user.handle}</h3>
          </div>
      </header>
      <section class="tweet-text">
        <p>${(escape(tweet.content.text))}</p>
      </section>
      <footer>
        <div class="tweet-icons">
          <p>${timeago.format(tweet.created_at)}</p>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </footer>
    </article>
    `);
    return $tweet;
  }

  const renderTweets = function (tweets) {
    $('.tweet-container').empty()
    for (const tweet of tweets) {
      $('.tweet-container').prepend(createTweetElement(tweet));
    }
  }

  $("#submitTweet").on("submit", function (event) {
    event.preventDefault();
    const textLength = $('#tweet-text').val().length;

    if (textLength === 0) {
      $('#error2').hide();
      return $("#error").show();
    }

    if (textLength > 140) {
      $('#error').hide();
      return $('#error2').show();
    }

    const tweetData = $(this).serialize();

    $.ajax({
      url: "/tweets",
      type: 'POST',
      data: tweetData,
      success: function () {
        loadTweets();
        $('#tweet-text').val('');
        $('#error').hide();
        $('#error2').hide();
        $('.counter').text('140');
      }
    });

  });

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: 'GET',
      success: function (data) {
        renderTweets(data);
      }
    });
  }
  loadTweets();
});



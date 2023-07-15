/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
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
        <p>If I have seen further it is by standing on the shoulder of giants</p>
      </section>
      <footer>
        <div class="tweet-icons">
          <p>${timeago.format(Date.now() - 11 * 1000 * 60 * 60)}</p>
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
  const renderTweets = function (tweetArray) {
    let tweet = "";
    let tweetContainer = "";
    for (let i = 0; i < tweetArray.length; i++) {
      tweet = createTweetElement(tweetArray[i]);
      tweetContainer = $('.tweet-container').append(tweet)
    }
    return tweetContainer;
  }
  // renderTweets(data);

  $("#submitTweet").on("submit", function(event) {
    event.preventDefault();
    let text = $('#tweet-text').val();
    console.log(text);
    console.log($(this).serialize());
  });
  
  // $.post("/tweets", function(data) {
  //   $("#submitTweet").html(data);
  // });
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      type: 'GET',
      success: function(data) {
        console.log(data);
        renderTweets(data);
      }
    });
  }
  loadTweets();
});



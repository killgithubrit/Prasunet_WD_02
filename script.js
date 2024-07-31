$(document).ready(function() {
  // Digital Clock
  function updateTime() {
      const now = new Date();
      let hour = now.getHours();
      const min = String(now.getMinutes()).padStart(2, '0');
      const sec = String(now.getSeconds()).padStart(2, '0');
      const ampm = hour >= 12 ? 'PM' : 'AM';

      // Convert to 12-hour format
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      hour = String(hour).padStart(2, '0');

      $('#hour').text(hour);
      $('#min').text(min);
      $('#sec').text(sec);
      $('#ampm').text(ampm);
  }
  setInterval(updateTime, 1000);

  // Stopwatch
  let stopwatchInterval;
  let stopwatchRunning = false;
  let elapsedTime = 0;

  function updateStopwatch() {
      const hours = Math.floor(elapsedTime / 3600000);
      const minutes = Math.floor((elapsedTime % 3600000) / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      const milliseconds = Math.floor((elapsedTime % 1000) / 10);

      $('#stopwatch-hour').text(String(hours).padStart(2, '0'));
      $('#stopwatch-min').text(String(minutes).padStart(2, '0'));
      $('#stopwatch-sec').text(String(seconds).padStart(2, '0'));
      $('#stopwatch-ms').text(String(milliseconds).padStart(2, '0'));
  }

  function startStopwatch() {
      const startTime = Date.now() - elapsedTime;
      stopwatchInterval = setInterval(function() {
          elapsedTime = Date.now() - startTime;
          updateStopwatch();
      }, 10);
      stopwatchRunning = true;
  }

  function stopStopwatch() {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
  }

  $('.start-stopwatch').click(function() {
      if (!stopwatchRunning) {
          startStopwatch();
          $(this).addClass('hidden');
          $('.pause-stopwatch').removeClass('hidden');
          $('.lap-stopwatch').removeClass('hidden');
      }
  });

  $('.pause-stopwatch').click(function() {
      if (stopwatchRunning) {
          stopStopwatch();
          $(this).addClass('hidden');
          $('.start-stopwatch').removeClass('hidden').text('Resume');
      }
  });

  $('.reset-stopwatch').click(function() {
      stopStopwatch();
      elapsedTime = 0;
      updateStopwatch();
      $('.start-stopwatch').removeClass('hidden').text('Start');
      $('.pause-stopwatch').addClass('hidden');
      $('.lap-stopwatch').addClass('hidden');
      $('.laps').empty();
  });

  $('.back-btn').click(function() {
      stopStopwatch();
      elapsedTime = 0;
      updateStopwatch();
      $('.stopwatch').addClass('hidden');
      $('.clock').removeClass('hidden');
      $('.start-stopwatch').removeClass('hidden').text('Start');
      $('.pause-stopwatch').addClass('hidden');
      $('.lap-stopwatch').addClass('hidden');
      $('.laps').empty();
  });

  let lapCount = 0;
  $('.lap-stopwatch').click(function() {
      lapCount++;
      const lapTime = $('#stopwatch-hour').text() + ':' + $('#stopwatch-min').text() + ':' + $('#stopwatch-sec').text() + ':' + $('#stopwatch-ms').text();
      $('.laps').append('<div class="lap"><p>Lap ' + lapCount + '</p><p>' + lapTime + '</p></div>');
  });

  $('#stopwatch-btn').click(function() {
      $('.clock').addClass('hidden');
      $('.stopwatch').removeClass('hidden');
  });
});

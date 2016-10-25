/* global document, DEBUG */
import 'pw-scripts/debug_config';
import 'pw-styles';

import { draw } from 'pw-scripts/brownian_motions/brownian2d';

import $ from 'jquery';

$(document).ready(() => {
  console.log('document is ready!');
  draw();
  console.log("drew!");
  $(window).on('resize', function () {
    $('#brownian2d').empty();
    draw();
  });
});

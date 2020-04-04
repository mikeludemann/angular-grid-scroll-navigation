import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'grid-scroll-navigation',
	templateUrl: './grid-scroll-navigation.component.html',
	styleUrls: ['./grid-scroll-navigation.component.css']
})
export class GridScrollNavigationComponent implements OnInit {

	@Input() ngStyle: { [key: string]: string; }

	//@Input() colors: any;
	//@Input() dataList: array;

	@ViewChild('gsn', {static: false}) el: ElementRef;

	constructor() { }

	ngOnInit() {
		var SETTINGS = {
			navBarTravelling: false,
			navBarTravelDirection: "",
			navBarTravelDistance: 150
		}

		var colours = {
			0: "#00ff00"
		};

		document.documentElement.classList.remove("no-js");
		document.documentElement.classList.add("js");

		var leftMove = document.getElementById("leftMove");
		var rightMove = document.getElementById("rightMove");

		var indicator = document.getElementById("indicator");

		var navi = document.getElementById("navi");
		var naviContent = document.getElementById("naviContent");

		navi.setAttribute("data-overflowing", determineOverflow(naviContent, navi));

		moveIndicator(navi.querySelector("[aria-selected=\"true\"]"), colours[0]);

		var last_known_scroll_position = 0;
		var ticking = false;

		function doSomething(scroll_pos: any) {

			navi.setAttribute("data-overflowing", determineOverflow(naviContent, navi));

		}

		navi.addEventListener("scroll", function() {

			last_known_scroll_position = window.scrollY;

			if (!ticking) {
				window.requestAnimationFrame(function() {
					doSomething(last_known_scroll_position);
					ticking = false;
				});
			}

			ticking = true;

		});


		leftMove.addEventListener("click", function() {

			if (SETTINGS.navBarTravelling === true) {

				return;

			}

			if (determineOverflow(naviContent, navi) === "left" || determineOverflow(naviContent, navi) === "both") {

				var availableScrollLeft = navi.scrollLeft;

				if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {

					naviContent.style.transform = "translateX(" + availableScrollLeft + "px)";

				} else {

					naviContent.style.transform = "translateX(" + SETTINGS.navBarTravelDistance + "px)";

				}

				naviContent.classList.remove("navi--contents--no--transition");

				SETTINGS.navBarTravelDirection = "left";
				SETTINGS.navBarTravelling = true;

			}

			navi.setAttribute("data-overflowing", determineOverflow(naviContent, navi));

		});

		rightMove.addEventListener("click", function() {

			if (SETTINGS.navBarTravelling === true) {
				return;
			}

			if (determineOverflow(naviContent, navi) === "right" || determineOverflow(naviContent, navi) === "both") {

				var navBarRightEdge = naviContent.getBoundingClientRect().right;
				var navBarScrollerRightEdge = navi.getBoundingClientRect().right;

				var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);

				if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
					naviContent.style.transform = "translateX(-" + availableScrollRight + "px)";
				} else {
					naviContent.style.transform = "translateX(-" + SETTINGS.navBarTravelDistance + "px)";
				}

				naviContent.classList.remove("navi--contents--no--transition");

				SETTINGS.navBarTravelDirection = "right";
				SETTINGS.navBarTravelling = true;

			}

			navi.setAttribute("data-overflowing", determineOverflow(naviContent, navi));

		});

		naviContent.addEventListener(
			"transitionend",
			function() {

				var styleOfTransform = window.getComputedStyle(naviContent, null);
				var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");

				var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
				naviContent.style.transform = "none";
				naviContent.classList.add("navi--contents--no--transition");

				if (SETTINGS.navBarTravelDirection === "left") {
					navi.scrollLeft = navi.scrollLeft - amount;
				} else {
					navi.scrollLeft = navi.scrollLeft + amount;
				}
				SETTINGS.navBarTravelling = false;
			},
			false
		);

		naviContent.addEventListener("click", function(e: any) {

			var links = [].slice.call(document.querySelectorAll(".navi--link"));

			links.forEach(function(item) {

				item.setAttribute("aria-selected", "false");

			})

			e.target.setAttribute("aria-selected", "true");


			moveIndicator(e.target, colours[links.indexOf(e.target)]);

		});

		function moveIndicator(item: any, color: any) {

			var textPosition = item.getBoundingClientRect();
			var container = naviContent.getBoundingClientRect().left;
			var distance = textPosition.left - container;
			var scroll = naviContent.scrollLeft;

			indicator.style.transform = "translateX(" + (distance + scroll) + "px) scaleX(" + textPosition.width * 0.01 + ")";

			if (color) {

				indicator.style.backgroundColor = color;

			}
		}

		function determineOverflow(content: any, container: any) {

			var containerMetrics = container.getBoundingClientRect();
			var containerMetricsRight = Math.floor(containerMetrics.right);
			var containerMetricsLeft = Math.floor(containerMetrics.left);
			var contentMetrics = content.getBoundingClientRect();
			var contentMetricsRight = Math.floor(contentMetrics.right);
			var contentMetricsLeft = Math.floor(contentMetrics.left);

			if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {

				return "both";

			} else if (contentMetricsLeft < containerMetricsLeft) {

				return "left";

			} else if (contentMetricsRight > containerMetricsRight) {

				return "right";

			} else {

				return "none";

			}

		}

		/**
		* dragscroll - scroll area by dragging
		*/

		var define: any;

		(function (root: any, factory: any) {
			if (typeof define === 'function' && define.amd) {
			define(['exports'], factory);
			} else if (typeof exports !== 'undefined') {
				factory(exports);
			} else {
				factory((root.dragscroll = {}));
			}
		}(this, function (exports: any) {
			var _window = window;
			var _document = document;
			var mousemove = 'mousemove';
			var mouseup = 'mouseup';
			var mousedown = 'mousedown';
			var EventListener = 'EventListener';
			var addEventListener = 'add'+EventListener;
			var removeEventListener = 'remove'+EventListener;
			var newScrollX, newScrollY;

			var dragged = [];
			var reset: any = function(i: any, el: any) {
				for (i = 0; i < dragged.length;) {
					el = dragged[i++];
					el = el.container || el;
					el[removeEventListener](mousedown, el.md, 0);
					_window[removeEventListener](mouseup, el.mu, 0);
					_window[removeEventListener](mousemove, el.mm, 0);
				}

				dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));

				for (i = 0; i < dragged.length;) {
					(function(el, lastClientX, lastClientY, pushed, scroller, cont){
						(cont = el.container || el)[addEventListener](
							mousedown,
							cont.md = function(e) {
								if (!el.hasAttribute('nochilddrag') ||
									_document.elementFromPoint(
										e.pageX, e.pageY
									) === cont
								) {
									pushed = 1;
									lastClientX = e.clientX;
									lastClientY = e.clientY;

									e.preventDefault();
								}
							}, 0
						);

						_window[addEventListener](
							mouseup, cont.mu = function() {pushed = 0;}, 0
						);

						_window[addEventListener](
							mousemove,
							cont.mm = function(e: any) {
								if (pushed) {
									(scroller = el.scroller||el).scrollLeft -=
										newScrollX = (- lastClientX + (lastClientX=e.clientX));
									scroller.scrollTop -=
										newScrollY = (- lastClientY + (lastClientY=e.clientY));
									if (el === _document.body) {
										(scroller = _document.documentElement).scrollLeft -= newScrollX;
										scroller.scrollTop -= newScrollY;
									}
								}
							}, 0
						);
					})(dragged[i++]);
				}
			}

			if (_document.readyState === 'complete') {
				reset();
			} else {
				_window[addEventListener]('load', reset, 0);
			}

			exports.reset = reset;
		}));
	}

}

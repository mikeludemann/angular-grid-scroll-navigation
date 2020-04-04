import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'angular-grid-scroll-navigation';

	dataList = [
		{ id: 1, linkID: "fish", status: true, name: "fish" },
		{ id: 2, linkID: "meat", status: false, name: "meat" },
		{ id: 3, linkID: "salad", status: false, name: "salad" },
		{ id: 4, linkID: "duck", status: false, name: "duck" },
		{ id: 5, linkID: "chicken", status: false, name: "chicken" },
		{ id: 6, linkID: "shake", status: false, name: "shake" },
		{ id: 7, linkID: "tea", status: false, name: "tea" },
		{ id: 8, linkID: "coffee", status: false, name: "coffee" },
		{ id: 9, linkID: "muesli", status: false, name: "fish" },
		{ id: 10, linkID: "seafood", status: false, name: "seafood" },
		{ id: 11, linkID: "bread", status: false, name: "bread" },
		{ id: 12, linkID: "burger", status: false, name: "burger" },
		{ id: 13, linkID: "icecream", status: false, name: "ice cream" },
		{ id: 14, linkID: "donuts", status: false, name: "donuts" },
		{ id: 15, linkID: "rice", status: false, name: "rice" }
	];
}

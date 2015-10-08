"use strict";

var EmployeeList = React.createClass({
	displayName: "EmployeeList",

	getInitialState: function getInitialState() {
		return { data: { allEmployees: [] }, chosenEmployees: [], chosenIdx: 0 };
	},

	componentDidMount: function componentDidMount() {
		var that = this;
		jQuery.get(this.props.url, function (result) {
			that.setState({ data: { allEmployees: result } });
		});
		this.setState({ chosenEmployees: this.chooseFiveAtRandom() });
	},

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(EmployeeQuestion, { person: this.chooseFiveAtRandom() }),
			React.createElement(EmployeeFaces, null)
		);
	},

	chooseFiveAtRandom: function chooseFiveAtRandom() {
		var theFive = [];
		theFive.push(this.randInRange());
		for (var i = 1; i < 5; i++) {
			var newEmployee = this.randInRange();
			if (jQuery.inArray(newEmployee, theFive) !== -1) {
				while (jQuery.inArray(newEmployee, theFive) !== -1) {
					newEmployee = this.randInRange();
				}
				theFive.push(newEmployee);
			}
		}
		// this.setState({ chosenEmployees: theFive });
		return theFive;
	},

	chooseOneOfFive: function chooseOneOfFive() {},

	randInRange: function randInRange() {
		var numEmployees = this.state.data.allEmployees.length;
		return Math.floor(Math.random() * numEmployees);
	}
});

var EmployeeQuestion = React.createClass({
	displayName: "EmployeeQuestion",

	render: function render() {
		return React.createElement(
			"div",
			{ id: "question-wrapper" },
			React.createElement(
				"h1",
				null,
				"Who is ",
				this.props.person,
				"?"
			)
		);
	}
});

var EmployeeFaces = React.createClass({
	displayName: "EmployeeFaces",

	render: function render() {
		return React.createElement(
			"div",
			{ id: "face-wrapper" },
			React.createElement("ul", null)
		);
	}
});

ReactDOM.render(React.createElement(EmployeeList, { url: "http://api.namegame.willowtreemobile.com/api/game" }), document.getElementById('app-wrapper'));
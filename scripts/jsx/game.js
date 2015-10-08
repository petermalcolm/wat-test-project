var EmployeeList = React.createClass({
	getInitialState: function() {
			return { data: { allEmployees : [] }, chosenEmployees : [], chosenIdx : 0 };
	},

	componentDidMount: function() {
		var that = this;
		jQuery.get(this.props.url, function(result){
			that.setState({ data: { allEmployees : result } } );
		});
		this.setState({ chosenEmployees: this.chooseFiveAtRandom() })
	},

	render: function() {
		return (
			<div>
				<EmployeeQuestion person={this.chooseFiveAtRandom()}/>
				<EmployeeFaces />
			</div>
		);
	},

	chooseFiveAtRandom: function() {
		var theFive = [];
		theFive.push(this.randInRange());
		for(var i=1; i < 5; i++ ) {
			var newEmployee = this.randInRange();
			if(jQuery.inArray(newEmployee, theFive) !== -1) {
				while(jQuery.inArray(newEmployee, theFive) !== -1) {
					newEmployee = this.randInRange();
				}
				theFive.push(newEmployee);
			}
		}
		// this.setState({ chosenEmployees: theFive });
		return(theFive);
	},

	chooseOneOfFive: function() {

	},

	randInRange: function() {
		var numEmployees = this.state.data.allEmployees.length;
		return Math.floor(Math.random() * numEmployees);
	}
});

var EmployeeQuestion = React.createClass({
	render: function() {
		return (
			<div id="question-wrapper">
				<h1>Who is {this.props.person}?</h1>
			</div>
		);
	}
});

var EmployeeFaces = React.createClass({
	render: function() {
	    return (
	    	<div id="face-wrapper">
		      <ul>

		      </ul>
		    </div>
	    );  

	}
});


ReactDOM.render(
	<EmployeeList url="http://api.namegame.willowtreemobile.com/api/game" />,
	document.getElementById('app-wrapper')
);
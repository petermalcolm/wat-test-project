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
				<EmployeeQuestion />
				<EmployeeFaces people={this.chooseFiveAtRandom()}/>
			</div>
		);
	},

	chooseFiveAtRandom: function() {
		var theFive = [];
		if(-1 == this.randInRange()) { return([]); } // need at least 5 
		theFive.push(this.randInRange());
		alert(theFive.toString());
		for(var i=1; i < 5; i++ ) {
		 	var newEmployee = this.randInRange();
		 	if(jQuery.inArray(newEmployee, theFive) !== -1) {
		 		while(jQuery.inArray(newEmployee, theFive) !== -1) {
		 			newEmployee = this.randInRange();
		 		}
		 	}
		 	theFive.push(newEmployee);
		}
		return(theFive);
	},

	chooseOneOfFive: function() {

	},

	randInRange: function() {
		var numEmployees = this.state.data.allEmployees.length;
		if(numEmployees < 5) { return -1; }
		return Math.floor(Math.random() * numEmployees);
	}
});

var EmployeeQuestion = React.createClass({
	render: function() {
		return (
			<div id="question-wrapper">
				<h1>Who is ?</h1>
			</div>
		);
	}
});

var EmployeeFaces = React.createClass({
	render: function() {
		// var faces = [];
  //     	for(var i=0; i<5; i++ ){
  //     		faces.push( '<li>' + {this.props.people[i]} + '</li>' );
  //     	}
	    return (
	    	<div id="face-wrapper">
		      <ul>
		      	{this.props.people.map()}
		      </ul>
		    </div>
	    );  

	}
});

var EmployeeFace = React.createClass({
	render: function() {
		return (
			<div></div>
		);
	}
})

ReactDOM.render(
	<EmployeeList url="http://api.namegame.willowtreemobile.com/api/game" />,
	document.getElementById('app-wrapper')
);
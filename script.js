
var InputBox = React.createClass({
	getInitialState: function() {
		return this.props.initialState;
	},
	handleTextChange: function(e) {
		var newUserText = e.target.value
		/* sent new text to parent's handler */
		this.props.onNewInputText({text: newUserText});
		this.setState({text: newUserText});
	},
	render: function() {
		return (
			<textarea
				defaultValue={this.state.text}
				className=''
				onChange={this.handleTextChange}
			/>
		);
	}
});

var OutputBox = React.createClass({
	rawMarkup: function() {
		console.log("doop");
		var rawMarkup = marked(this.props.codeToFormat, {sanitize: true});
		console.log(rawMarkup)
		return { __html: rawMarkup };
	},
	render: function() {
		return (
			<div dangerouslySetInnerHTML={this.rawMarkup()} />
		);
	}
});

var MainBox = React.createClass({
	getInitialState: function() {
		return {text: 'TO BE REPLACED WITH MARKDOWN CODE'};
	},
	handleInputText: function(e) {
		this.setState({text:e.text});
	},
	render: function() {
		return (
			<div>
				<InputBox onNewInputText={this.handleInputText} initialState={this.state}/>
				<OutputBox codeToFormat={this.state.text}/>
			</div>
		);
	}
});

// apparently the DOMContentLoaded is causing a conflict with Babel, not sure
//document.addEventListener('DOMContentLoaded', function(event) {
	ReactDOM.render(
		<MainBox />,
		document.getElementById('markdown-previewer')
	);
//}


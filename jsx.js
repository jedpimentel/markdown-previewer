
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
		//console.log(JSON.stringify(this.state.text));
		return (
			<div className="raw-markdown-box">
				<h1>Markdown</h1>
				<textarea
					defaultValue={this.state.text}
					className=''
					onChange={this.handleTextChange}
				/>
			</div>
		);
	}
});

var OutputBox = React.createClass({
	rawMarkup: function() {
		var rawMarkup = marked(this.props.codeToFormat, {sanitize: true});
		return { __html: rawMarkup };
	},
	render: function() {
		//console.log(this.rawMarkup());
		return (
			<div className="markdown-preview-box">
				<div dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

var MainBox = React.createClass({
	getInitialState: function() {
		return {text: "Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Jose E. Pimentel](https://freecodecamp.com/jedpimentel)*"};
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

ReactDOM.render(
	<MainBox />,
	document.getElementById('markdown-previewer')
);


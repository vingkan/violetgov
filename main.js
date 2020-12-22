class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Welcome to VioletGov!</h1>
            </div>
        );
    }
}

const mainEl = <Main />
ReactDOM.render(mainEl, document.getElementById("main"));

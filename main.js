/*
 * Parses CSV text input into a list of JSON user objects.
 * Assumes the first row contains the column headers.
 */
function parseUsersCSV(csv) {
    const rows = csv
        .split("\n")
        .map(l => l.trim())
        .filter(l => l.length > 0)
        .map(l => l.split(","));
    const header = rows[0];
    const users = rows
        .slice(1)
        .map((row) => {
            return header.reduce((user, column, i) => {
                user[column] = row[i];
                return user;
            }, {});
        });
    return users;
}

class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.props.user;
        const firstInitial = user.FirstName.length >= 1
            ? user.FirstName.substr(0, 1).toUpperCase()
            : "?";
        const displayName = `${user.FirstName} ${user.LastName}`;
        return (
            <div className="User">
                <div className="User__Initial">{firstInitial}</div>
                <div className="User__Profile">
                    <h3>{displayName}</h3>
                    <p>{user.Email || "No Email"}</p>
                    <p>{user.ZipCode || "No Zip Code"}</p>
                </div>
            </div>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const users = this.props.users;
        return (
            <div className="Main">
                <h1>Welcome to VioletGov!</h1>
                <p>Helping you build strong constituent relationships.</p>
                <h2>Your Constituents</h2>
                <div className="Main__Users">
                    {users.map((user, i) => {
                        return <User key={i} user={user} />;
                    })}
                </div>
            </div>
        );
    }
}

/*
 * Red is missing LastName
 * Purple is missing Email
 * Yellow is missing ZipCode
 * Green and Blue have non-ASCII characters
 * Blank lines should not produce users
 */
const usersCSV = `
Email,FirstName,LastName,ZipCode
red@colors.us,Red,,60652
orange@colors.us,Orange,O'Brien,60623

yellow@colors.us,Yellow,Yesenia,
green@colors.us,Green,González,60616
blue@colors.us,Blue,Bueños,60607
,Purple,Postovsky,60622
`;

const usersJSON = parseUsersCSV(usersCSV);

const mainEl = <Main users={usersJSON} />
ReactDOM.render(mainEl, document.getElementById("main"));

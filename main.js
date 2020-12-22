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
        this.props.users = this.props.users || [];
    }
    render() {
        const users = this.props.users;
        const nUsers = users.length;
        const pluralUsers = nUsers === 1 ? "user" : "users";
        return (
            <div className="Main">
                <h1>Welcome to VioletGov!</h1>
                <p>Helping you build strong constituent relationships.</p>
                <h2>Your Constituents</h2>
                <p>Showing {nUsers} {pluralUsers}.</p>
                <div className="Main__Users">
                    {users.map((user, i) => {
                        return <User key={i} user={user} />;
                    })}
                </div>
            </div>
        );
    }
}

const mainEl = <Main />
ReactDOM.render(mainEl, document.getElementById("main"));

// Fetch constituent data from file.
fetch("./constituents.csv").then(async (res) => {
    const csv = await res.text();
    const usersJSON = parseUsersCSV(csv);
    const mainEl = <Main users={usersJSON} />
    ReactDOM.render(mainEl, document.getElementById("main"));
}).catch((err) => {
    console.log("Error fetching users:");
    console.error(err);
});

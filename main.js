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

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Welcome to VioletGov!</h1>
                <p>Helping you build strong constituent relationships.</p>
            </div>
        );
    }
}

/*
 * Red is missing LastName
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
`;

const usersJSON = parseUsersCSV(usersCSV);
console.log(usersJSON);

const mainEl = <Main users={usersJSON} />
ReactDOM.render(mainEl, document.getElementById("main"));

//Define User model class
var User = /** @class */ (function () {
    function User(firstName, middleName, lastName, email, phoneNumber, role, address) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.address = address;
    }
    return User;
}());
// Define enum for roles
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "Admin";
    UserRole["USER"] = "User";
    UserRole["GUEST"] = "Guest";
})(UserRole || (UserRole = {}));
// Define Actions implementation using JSON data
var UserActions = /** @class */ (function () {
    function UserActions() {
        // Sample data for demonstration purposes
        this.users = [
            new User("harsh", "S", "Kaushik", "hsk@gmail.com", "9898989", UserRole.ADMIN, "India"),
            new User("Krystal", "", "Clear", "krystal@hsk.com", "0000000", UserRole.USER, "India"),
        ];
    }
    UserActions.prototype.getAllUsers = function () {
        return this.users;
    };
    UserActions.prototype.getUserById = function (id) {
        return this.users[id];
    };
    UserActions.prototype.createUser = function (user) {
        this.users.push(user);
    };
    UserActions.prototype.updateUser = function (user) {
        var index = this.users.findIndex(function (u) { return u.email === user.email; });
        if (index >= 0) {
            this.users[index] = user;
        }
    };
    UserActions.prototype.deleteUser = function (id) {
        this.users.splice(id, 1);
    };
    return UserActions;
}());
// Initialize user actions
var Actions = new UserActions();
// Function to render user table row
function renderUserRow(user, index) {
    var row = document.createElement("tr");
    var firstNameCell = document.createElement("td");
    var middleNameCell = document.createElement("td");
    var lastNameCell = document.createElement("td");
    var emailCell = document.createElement("td");
    var phoneCell = document.createElement("td");
    var roleCell = document.createElement("td");
    var addressCell = document.createElement("td");
    var actionsCell = document.createElement("td");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    firstNameCell.innerText = user.firstName;
    middleNameCell.innerText = user.middleName;
    lastNameCell.innerText = user.lastName;
    emailCell.innerText = user.email;
    phoneCell.innerText = user.phoneNumber;
    roleCell.innerText = user.role;
    addressCell.innerText = user.address;
    // Edit button click handler
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function () {
        // Make row editable
        firstNameCell.contentEditable = "true";
        middleNameCell.contentEditable = "true";
        lastNameCell.contentEditable = "true";
        emailCell.contentEditable = "true";
        phoneCell.contentEditable = "true";
        roleCell.contentEditable = "true";
        addressCell.contentEditable = "true";
        // Change button to Save and Cancel
        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
        cancelButton.style.display = "inline-block";
    });
    // Save button click handler
    var saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.style.display = "none";
    saveButton.addEventListener("click", function () {
        // Update user data
        var updatedUser = new User(firstNameCell.innerText, middleNameCell.innerText, lastNameCell.innerText, emailCell.innerText, phoneCell.innerText, roleCell.innerText, addressCell.innerText);
        Actions.updateUser(updatedUser);
        // Re-render row
        var newRow = renderUserRow(updatedUser, index);
        row.parentNode.replaceChild(newRow, row);
    });
    // Cancel button click handler
    var cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.style.display = "none";
    cancelButton.addEventListener("click", function () {
        // Re-render original row data
        var originalUser = Actions.getUserById(index);
        var originalRow = renderUserRow(originalUser, index);
        row.parentNode.replaceChild(originalRow, row);
    });
    // Delete button click handler
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
        // Remove row from table and delete user data
        row.parentNode.removeChild(row);
        Actions.deleteUser(index);
    });
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(saveButton);
    actionsCell.appendChild(cancelButton);
    actionsCell.appendChild(deleteButton);
    row.appendChild(firstNameCell);
    row.appendChild(middleNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(roleCell);
    row.appendChild(addressCell);
    row.appendChild(actionsCell);
    return row;
}
// Function to render all users in the table
function renderUserTable() {
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    var users = Actions.getAllUsers();
    users.forEach(function (user, index) {
        var row = renderUserRow(user, index);
        tbody.appendChild(row);
    });
}
// Load data button click handler
var loadDataButton = document.querySelector("#load-data");
loadDataButton.addEventListener("click", function () {
    // Show table and change button text to Refresh data
    var userTable = document.querySelector("#user-table");
    userTable.style.display = "table";
    loadDataButton.innerText = "Refresh data";
    // Render table rows
    renderUserTable();
});

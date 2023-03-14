//Define User model class
class User {
  constructor(
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public role: UserRole,
    public address: string
  ) {}
}

// Define enum for roles
enum UserRole {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest",
}

// Define interface for CRUD actions
interface Actions {
  getAllUsers(): User[];
  getUserById(id: number): User;
  createUser(user: User): void;
  updateUser(user: User): void;
  deleteUser(id: number): void;
}

// Define Actions implementation using JSON data
class UserActions implements Actions {
  private users: User[];

  constructor() {
    // Sample data for demonstration purposes
    this.users = [
      new User(
        "harsh",
        "S",
        "Kaushik",
        "hsk@gmail.com",
        "9898989",
        UserRole.ADMIN,
        "India"
      ),
      new User(
        "Krystal",
        "",
        "Clear",
        "krystal@hsk.com",
        "0000000",
        UserRole.USER,
        "India"
      ),
    ];
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    return this.users[id];
  }

  createUser(user: User): void {
    this.users.push(user);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex((u) => u.email === user.email);
    if (index >= 0) {
      this.users[index] = user;
    }
  }

  deleteUser(id: number): void {
    this.users.splice(id, 1);
  }
}

// Initialize user actions
const Actions: Actions = new UserActions();

// Function to render user table row
function renderUserRow(user: User, index: number): HTMLTableRowElement {
  const row = document.createElement("tr");
  const firstNameCell = document.createElement("td");
  const middleNameCell = document.createElement("td");
  const lastNameCell = document.createElement("td");
  const emailCell = document.createElement("td");
  const phoneCell = document.createElement("td");
  const roleCell = document.createElement("td");
  const addressCell = document.createElement("td");
  const actionsCell = document.createElement("td");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  firstNameCell.innerText = user.firstName;
  middleNameCell.innerText = user.middleName;
  lastNameCell.innerText = user.lastName;
  emailCell.innerText = user.email;
  phoneCell.innerText = user.phoneNumber;
  roleCell.innerText = user.role;
  addressCell.innerText = user.address;

  // Edit button click handler

  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => {
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
  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.style.display = "none";
  saveButton.addEventListener("click", () => {
    // Update user data
    const updatedUser = new User(
      firstNameCell.innerText,
      middleNameCell.innerText,
      lastNameCell.innerText,
      emailCell.innerText,
      phoneCell.innerText,
      roleCell.innerText as UserRole,
      addressCell.innerText
    );
    Actions.updateUser(updatedUser);

    // Re-render row
    const newRow = renderUserRow(updatedUser, index);
    row.parentNode!.replaceChild(newRow, row);
  });

  // Cancel button click handler
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.style.display = "none";
  cancelButton.addEventListener("click", () => {
    // Re-render original row data
    const originalUser = Actions.getUserById(index);
    const originalRow = renderUserRow(originalUser, index);
    row.parentNode!.replaceChild(originalRow, row);
  });

  // Delete button click handler
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    // Remove row from table and delete user data
    row.parentNode!.removeChild(row);
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
  const tbody = document.querySelector("tbody");
  tbody!.innerHTML = "";

  const users = Actions.getAllUsers();
  users.forEach((user, index) => {
    const row = renderUserRow(user, index);
    tbody!.appendChild(row);
  });
}

// Load data button click handler
const loadDataButton = document.querySelector("#load-data");
loadDataButton!.addEventListener("click", () => {
  // Show table and change button text to Refresh data
  const userTable = document.querySelector("#user-table");
  userTable!.style.display = "table";
  loadDataButton!.innerText = "Refresh data";

  // Render table rows
  renderUserTable();
});

import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { getConfig } from "./near-config";

const nearConfig = getConfig(process.env.NODE_ENV || "development");

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["get_tasks"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: [
        "add_task",
        "update_task_content",
        "update_task_status",
        "clear_tasks",
        "delete_task",
      ],
    }
  );
}

export function signOutNearWallet() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function signInWithNearWallet() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export async function getTasks() {
  const res = await window.contract.get_tasks();
  return res;
}

export async function addTask(content) {
  const res = await window.contract.add_task({
    args: {
      content,
    },
  });
  return res;
}

export async function updateTaskContent(id, content) {
  const res = await window.contract.update_task_content({
    args: {
      id,
      content,
    },
  });
  return res;
}

export async function updateTaskStatus(id, isCompleted) {
  const res = await window.contract.update_task_status({
    args: {
      id,
      is_completed: isCompleted,
    },
  });
  return res;
}

export async function deleteTask(id) {
  const res = await window.contract.delete_task({
    args: {
      id,
    },
  });
  return res;
}

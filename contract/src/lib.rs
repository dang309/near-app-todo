/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env;
use near_sdk::json_types::U64;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{log, near_bindgen, AccountId};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct TaskItem {
    id: u32,
    content: String,
    is_completed: bool,
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    tasks: Vec<TaskItem>,
}

// Define the default, which automatically initializes the contract
impl Default for Contract {
    fn default() -> Self {
        env::panic(b"Voting contract should be initialized before usage")
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    #[init]
    pub fn new() -> Self {
        assert!(!env::state_exists(), "The contract is already initialized");
        Contract { tasks: Vec::new() }
    }

    pub fn get_tasks(self) -> Vec<TaskItem> {
        return self.tasks;
    }

    pub fn add_task(&mut self, content: String) {
        let mut id: u32 = 1;
        let cloneTasks = self.tasks.clone();
        if cloneTasks.len() > 0 {
            let len = cloneTasks.len();
            id = cloneTasks[len - 1].id + 1;
        }
        let new_item: TaskItem = TaskItem {
            id: id,
            content: content,
            is_completed: false,
        };
        self.tasks.push(new_item);
    }

    pub fn update_task_content(&mut self, id: u32, content: String) {
        let idx = self.tasks.iter().position(|o| o.id == id).unwrap();
        self.tasks[idx].content = content;
    }

    pub fn update_task_status(&mut self, id: u32, is_completed: bool) {
        let idx = self.tasks.iter().position(|o| o.id == id).unwrap();
        self.tasks[idx].is_completed = is_completed;
    }

    pub fn clear_tasks(&mut self) {
        if env::current_account_id() == env::predecessor_account_id() {
            self.tasks.clear();
        }
    }

    pub fn delete_task(&mut self, id: u32) {
        let idx = self.tasks.iter().position(|o| o.id == id).unwrap();
        self.tasks.remove(idx);
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn get_default_greeting() {
        let contract = Contract::default();
        // this test did not call set_greeting so should return the default "Hello" greeting
        assert_eq!(contract.get_greeting(), "Hello".to_string());
    }

    #[test]
    fn set_then_get_greeting() {
        let mut contract = Contract::default();
        contract.set_greeting("howdy".to_string());
        assert_eq!(contract.get_greeting(), "howdy".to_string());
    }
}

const express = require("express")
const TodoItem = require("../models/todoItem")

const createTodoItem = async (req, res) => {
    try {
      const todoItem = req.body;
      const item = TodoItem(todoItem);
      console.log(item)
      await item.save();
      console.log(' Todo Item received from frontend:', todoItem);
      res.status(200).json({ message: 'Todo item received at backend' });
    } catch (err) {
      console.error('Failed to save Todo item:', err);
      res.status(500).json({ error: 'Failed to save Todo item ' });
    }
  };
  
  const getTodoItems= async (req, res) => {
    try {
        const itemFromDatabase = await TodoItem.find();
        res.status(200).json({ message: 'Todo item  retrieved from backend', todoItem: itemFromDatabase });
      } catch (err) {
        console.error('Failed to retrieve Todo item :', err);
        res.status(500).json({ error: 'Failed to retrieve Todo items ' });
      }
  };

  const updateTodoItem= async (req, res) => {
    try {
      const {id}= req.body;
      console.log(id)
        const{todoItem}=req.body;
        console.log(todoItem);
        const updatedItem = await TodoItem.findByIdAndUpdate(id, { todoItem:todoItem });
        console.log(updatedItem);

        res.status(200).json({ success : 'Todo item  updated at backend' });
      } catch (err) {
        console.error('Failed to update Todo item :', err.message);
        res.status(500).json({ error: 'Failed to update Todo items ' });
      }
  };

  const deleteTodoItem= async (req, res) => {
    try {
        const{_id}=req.body;
        console.log(_id);
        const delItem = await TodoItem.findByIdAndDelete({ _id });
        console.log(delItem );
        res.status(200).json({ status: "success" });
      } catch (err) {
        console.error('Failed to delete Todo item :', err.message);
        res.status(404).json({ error: 'Failed to delete Todo items ' });
      }
  };

  module.exports = {
    createTodoItem,
    getTodoItems,
    updateTodoItem,
    deleteTodoItem
  };




  


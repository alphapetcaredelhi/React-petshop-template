// Daniel da Rocha Fróes 10255956
// Gabriel Santos Nicolau 10684600
// Kaio Tadeu Rodrigues 7561083
'use strict'

// Determina como deve ser salvo no banco de dados, a estrutura de order

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    unique: true
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'done'],
    default: 'created'
  },
  items: [{
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }]
});

module.exports = mongoose.model('Cart', schema);
import { Model } from 'objection';
import bcrypt from 'bcryptjs';
import config from '../config';
import commonUtils from '../utils/common';

// Import the plugin.
// TODO: Remember to add unique back to the class definition
const unique = require('objection-unique')({
  fields: ['email'],
  identifiers: ['id'],
});

export default class User extends unique(Model) {
  static tableName = 'users';
  static jsonSchema = {
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password', 'gender'],
    properties: {
      id: { type: 'number' },
      firstname: { type: 'string', maxLength: '100' },
      lastname: { type: 'string', maxLength: '255' },
      email: {
        type: 'string',
        format: 'email',
        minLength: '5',
        maxLength: '100',
      },
      password: { type: 'string' },
      gender: {
        type: 'string',
        enum: ['male', 'female', 'unknown'],
        default: 'not-set',
      },
      dob: { type: 'string' },
      version_key: { type: 'string' },
    },
  };
  async $beforeInsert() {
    this.password = await bcrypt.hash(this.password, config.saltFactor);
    this.version_key = await bcrypt.hash(
      commonUtils.randomStr(),
      config.saltFactor,
    );
  }
  async $beforeUpdate(opt) {
    const isPasswordMatch = bcrypt.compare(this.password, opt.old.password);
    if (!isPasswordMatch) {
      this.password = await bcrypt.hash(this.password, config.saltFactor);
      this.version_key = await bcrypt.hash(
        commonUtils.randomStr(),
        config.saltFactor,
      );
    }
  }
  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

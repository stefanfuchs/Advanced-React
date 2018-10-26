import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import formatMonet from '../lib/formatMoney'
import gql from 'graphql-tag';


class CreateItem extends Component {
  state = {
    title: 'Cool Shoes',
    description: 'I love those shoes',
    image: 'dog.jpg',
    largeImage: 'large-dog.jpg',
    price: 1000,
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  render() {
    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
              required />
          </label>
        </fieldset>
      </Form>
    );
  }
}

export default CreateItem;
import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import formatMonet from '../lib/formatMoney'
import gql from 'graphql-tag';
import Router from 'next/router'


const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
      }
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'Cool Shoes',
    description: 'I love those shoes',
    image: 'dog.jpg',
    largeImage: 'large-dog.jpg',
    price: 1000,
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val })
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={async (e) => {
            e.preventDefault()
            const res = await createItem()
            //change to the single item page
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
            <input type="text" id="title" name="title" placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required />
              </label>

              <label htmlFor="price">
                Price
            <input type="number" id="price" name="price" placeholder="Price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  required />
              </label>

              <label htmlFor="description">
                Description
            <textarea type="text" id="description" name="description" placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION }
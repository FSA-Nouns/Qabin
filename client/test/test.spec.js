import {expect} from 'chai'
import React from 'react'
import {Provider} from 'react-redux'
import Enzyme, {shallow} from 'enzyme'
import sinon from 'sinon'
import Home from '../components/home'
import {
  table,
  tables,
  tableNames,
  queryResultTables,
  mockResDataObj,
  fileNames,
  filePaths,
  newFileNames
} from './testData.js'

describe('home Component', () => {
  let wrapper
  let listAll = sinon.spy()
  beforeEach('set up wrapper', () => {
    wrapper = shallow(<Home tableNames={tableNames} />)
  })

  it('displays a ListItemText component for every table stored for that user', () => {
    expect(wrapper.find('ListItemText')).to.have.lengthOf(3)
    const text = wrapper.text()
    expect(text).to.include(`${tableNames[0]}`)
    expect(text).to.include(`${tableNames[1]}`)
    expect(text).to.include(`${tableNames[2]}`)
  })
  // it('invokes deleteUserTable when the delete button for a table is clicked', () => {})
})

// describe('file-upload Component', () => {
//   let wrapper
//   let listAll = sinon.spy()
//   beforeEach('set up wrapper', () => {
//     wrapper = shallow(<SinglePuppy puppy={puppy} listAll={listAll} />)
//   })

//   it("displays the puppy's name, age, and photo", () => {
//     const img = wrapper.find('img')
//     expect(img.html()).to.include(puppy.image)
//     const text = wrapper.text()
//     expect(text).to.include(puppy.name)
//     expect(text).to.include(puppy.age)
//   })
// })

// describe('editData Component', () => {
//   let wrapper
//   let listAll = sinon.spy()
//   beforeEach('set up wrapper', () => {
//     wrapper = shallow(<SinglePuppy puppy={puppy} listAll={listAll} />)
//   })

//   it("displays the puppy's name, age, and photo", () => {
//     const img = wrapper.find('img')
//     expect(img.html()).to.include(puppy.image)
//     const text = wrapper.text()
//     expect(text).to.include(puppy.name)
//     expect(text).to.include(puppy.age)
//   })
// })

// describe('query-row Component', () => {
//   let wrapper
//   let listAll = sinon.spy()
//   beforeEach('set up wrapper', () => {
//     wrapper = shallow(<SinglePuppy puppy={puppy} listAll={listAll} />)
//   })

//   it("displays the puppy's name, age, and photo", () => {
//     const img = wrapper.find('img')
//     expect(img.html()).to.include(puppy.image)
//     const text = wrapper.text()
//     expect(text).to.include(puppy.name)
//     expect(text).to.include(puppy.age)
//   })
// })

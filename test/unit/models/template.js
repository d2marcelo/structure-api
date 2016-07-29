import {Schema, type} from 'eisley'

import TemplateModel         from '../../../src/models/template'
import TemplateRevisionModel from '../../../src/models/template-revision'

describe('Template', function() {

  it('should initialize', function(done) {

    var template = new TemplateModel()

    expect(template.name).to.be.equal('templates')

    done()

  })

  /** @test {TemplateModel#create} */
  it('should create a template',  async (done) => {

    var template = new TemplateModel()

    var res = await template.create({
      title: 'Fun Template'
    })

    expect(res.title).to.equal('Fun Template')

    done()

  })

  /** @test {TemplateModel#getByID} */
  it('should get a template by ID', async function(done){

    var template = new  TemplateModel()

    var templateRes = await template.create({
      title: 'Fun Template'
    })

    var getByIdResponse = await  template.getById(templateRes.id)

    expect(getByIdResponse.title).to.equal('Fun Template')

    done()

  })

  /** @test {TemplateModel#getAll} **/
  it('should get all templates', async function(done){

    var template = new  TemplateModel()

    var templateRes = await template.create({
      title: 'Fun Template'
    })

    var getAllResponse = await template.getAll();
    expect(getAllResponse.length > 0).to.be.true

    done()

  })

  /** @test {TemplateModel#update} */
  it('should update a template ', async function(done) {

    var  template = new TemplateModel()

    var templateRes = await template.create({
      title: 'Fun Template'
    })

    var templateUpdateRes= await template.update(templateRes.id, {
      title: 'Fun Template 3'
    })

    expect(templateUpdateRes.title).to.equal('Fun Template 3')

    done()

  })

  /** @test {TemplateRevisionModel#create} */
  it('should create a template revision',  async function(done) {

    var template = new TemplateModel()

    var res = await template.create({
      title: 'Fun Template'
    })

    var revision = new TemplateRevisionModel({
      templateId: res.id
    })

    var res2 = await revision.create({
      fields: [
      {
        fieldType: 'text-input',
        title: 'Document Title'
      }
      ]
    })

    var res3 = await template.update(res.id, {
      activeRevisionId: res2.id,
      revisionIds: [res2.id],
      title: 'Fun Template 2'
    })

    expect(res2.fields.length).to.equal(1)
    expect(res2.fields[0].title).to.equal('Document Title')
    expect(res3.activeRevisionId).to.equal(res2.id)
    expect(res3.title).to.equal('Fun Template 2')

    done()

  })

  /** @test {TemplateModel#getByID} */
  it('should get a template by ID', async function(done){

    var template = new  TemplateModel()

    var templateRes = await template.create({
      title: 'Fun Template'
    })

    var revision = new TemplateRevisionModel({
      templateId: templateRes.id
    })

    var revisionRes = await revision.create({
      fields: [
      {
        fieldType: 'text-input',
        title: 'Document Title'
      }
      ]
    })

    var getByIdRes = await  revision.getById(revisionRes.id)


    expect(getByIdRes.fields.length).to.equal(1)
    expect(getByIdRes.fields[0].title).to.equal('Document Title')

    done()

  })

  /** @test {TemplateModel#getAll} **/
  it('should get all templates revisions', async function(done){

    var template = new TemplateModel()

    var templateRes = await template.create({
      title: 'Fun Template'
    })

    var revision = new TemplateRevisionModel({
      templateId: templateRes.id
    })

    var revisionRes = await revision.create({
      fields: [
      {
        fieldType: 'text-input',
        title: 'Document Title'
      }
      ]
    })

    var getAllResponse = await revision.getAll();

    expect(getAllResponse.length > 0).to.be.true

    done()

  })

  /** @test {TemplateRevisionModel#update} */
  it('should update a template revision',  async function(done) {

    var template = new TemplateModel()

    var res = await template.create({
      title: 'Fun Template'
    })

    var revision = new TemplateRevisionModel({
      templateId: res.id
    })

    var res2 = await revision.create({
      fields: [
      {
        fieldType: 'text-input',
        title: 'Document Title'
      }
      ]
    })

    var res3 = await template.update(res.id, {
      activeRevisionId: res2.id,
      revisionIds: [res2.id],
      title: 'Fun Template 2'
    })

    var res4 = await revision.update(res2.id, {
      fields: [
      {
        fieldType: 'text-input',
        title: 'Revision Title'
      },
      {
        fieldType: 'text-input',
        title: 'Description'
      }
      ]
    })

    expect(res3.title).to.equal('Fun Template 2')
    expect(res4.fields.length).to.equal(2)
    expect(res4.fields[0].title).to.equal('Revision Title')
    expect(res4.fields[1].title).to.equal('Description')

    done()

  })

})

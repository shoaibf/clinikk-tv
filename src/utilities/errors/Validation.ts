import HttpError from './HttpError' 

export default class Validations extends HttpError {
  errors: []
  public constructor(errors: any) {
    super(422, 'Validation Error')
    this.errors = errors
  }

  getData() {
    const data :any = []
    this.errors.forEach( (field:any) => {
      data.push({
        field: field.path.join('.'),
        type: field.type,
        message: field.message.replace(/"/g, '')
      })
    })
    return data
  }
}
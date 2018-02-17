export class Code
{
  html = '<div> Welcome to poetjs write your code here </div>';
  css = '';
  js = '';
  guid = '';

  constructor()
  {
    this.guid = this.generateGuid();
  }

  public generateGuid()
  {
    return Math.random().toString(36).substring(2)
      + (new Date()).getTime().toString(36);
  }
}

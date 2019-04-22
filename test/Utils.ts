export default class Utils {

  public static randomString() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 10; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  public static setTimeoutAsync(timeout: number) {
    return new Promise((res) => {
      setTimeout(res, timeout);
    });
  }
}
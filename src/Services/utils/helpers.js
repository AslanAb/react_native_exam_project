const limitStr = (str, n, symb) => {
  if (!n && !symb) return str;
  symb = n > str.length ? '' : symb || '...';
  return str.substr(0, n - symb.length) + symb;
}

export default {limitStr}
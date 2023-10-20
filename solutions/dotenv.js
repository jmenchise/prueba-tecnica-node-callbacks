import fs from 'node:fs';

export function config({ path = '.env' } = {}) {
   try {
      const env = fs.readFileSync(path, 'utf-8');
      const lines = env.split('\n');

      lines.forEach(line => {
         const [key, ...value] = line.split('=');
         const joinedValue = value.join('=');

         const hasQuotes = joinedValue.startsWith('"')
            && joinedValue.endsWith('"');

         const valueToStore = hasQuotes
            ? joinedValue.slice(1, -1)
            : joinedValue;

         process.env[key] = valueToStore;
      })
   } catch (error) {
      console.error(error);
   }
}

const dotenv = {
   config
}

export default dotenv;
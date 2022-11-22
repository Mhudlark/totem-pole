export type GenerateRoomName = () => string;

export const generateRoomName: GenerateRoomName = (nameLength: number = 6) => {
  const time = performance.now() * 123456789;
  const timeStr = time.toString();

  const characterLib = 'abcdefghjkmnpqrstuvwxyz0123456789';
  const characterLibLength = characterLib.length;

  const numDigitsPerCharacter = 2;

  const randomStringArr = Array(nameLength)
    .fill(0)
    .map((_e, index) => {
      const digitsStartIndex = index * numDigitsPerCharacter;
      const digitsEndIndex = digitsStartIndex + numDigitsPerCharacter;
      const digitsStr = timeStr.slice(digitsStartIndex, digitsEndIndex);

      const digits = parseInt(digitsStr, 10);

      const characterIndex = digits % characterLibLength;

      return characterLib[characterIndex];
    });

  return randomStringArr.join('');
};

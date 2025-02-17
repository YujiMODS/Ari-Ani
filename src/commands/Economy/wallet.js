const economyJs = require('../../models/economic')

module.exports = {
  name: 'wallet',
  alias:["wal"],
  usage:`${prefa}wallet`,
  desc:"View your wallet balance.",
  category:"Economy",
  react:"✅",
    start:async(client,m,{command,prefix , pushName,tagId})=>{

      if (!m.from.endsWith("@g.us")) {
        return m.reply("Please use this command in a group.");
      }
    const userId = m.sender;
    let economy = await economyJs.findOne({ userId: userId });

    if (!economy) {
      economy = new economyJs({ userId: userId });
      await economy.save();
    }

    const wallet = economy.wallet.toLocaleString();
    const bank = economy.bank.toLocaleString();

    let walText = `\n*❁財⍩𝕎𝕒𝕝𝕝𝕖𝕥 - 💴*\n\n〽️Name: ${pushName}\n\n🆔️Tag: ${tag}\n\n👛Wallet: ${wallet}`
    
    // let button = [
    //     { buttonId: `${prefix}bank`, buttonText: { displayText: 'Bank' }, type: 1 },
    //   ];

    //   let buttonMessage = {
    //       text: walText,
    //       footer: "Ari-Ani",
    //       buttons: button,
    //       headerType: 1
    //     };

        await client.sendMessage(m.from , {text: walText} , {quoted:m})
  }
};

/*
 * @Description: 
 * @Author: kay
 * @Date: 2021-07-09 14:56:22
 * @LastEditTime: 2021-07-13 14:19:55
 * @LastEditors: kay
 */

const Web3 = require('/home/y/platon-node/contracts/wasm/multisig/test/node_modules/web3');
const chai = require('/home/y/platon-node/contracts/wasm/multisig/test/node_modules/chai');
const expect = chai.expect;

const web3 = new Web3('http://192.168.1.65:6789');
const LockContractAbi = require('../build/contracts/lock.abi.json');
const LockContractAddress = "lat1csjupkd7n6sg8d6c8gp5y76tm6esmze4vh93ua";
const MultisigContractAbi = [{ "anonymous": false, "input": [{ "name": "topic1", "type": "FixedHash<20>" }, { "name": "topic2", "type": "string" }, { "name": "arg1", "type": "FixedHash<20>" }, { "name": "arg2", "type": "uint128" }, { "name": "arg3", "type": "int64" }], "name": "ProposeTransfer", "topic": 2, "type": "Event" }, { "anonymous": false, "input": [{ "name": "topic1", "type": "FixedHash<20>" }, { "name": "topic2", "type": "string" }, { "name": "arg1", "type": "set<string>" }, { "name": "arg2", "type": "uint8" }, { "name": "arg3", "type": "int64" }], "name": "ProposeUpdateManagers", "topic": 2, "type": "Event" }, { "constant": false, "input": [{ "name": "proposal_name", "type": "string" }], "name": "approve", "output": "bool", "type": "Action" }, { "anonymous": false, "input": [{ "name": "topic1", "type": "FixedHash<20>" }, { "name": "topic2", "type": "string" }, { "name": "arg1", "type": "FixedHash<20>" }, { "name": "arg2", "type": "uint8[]" }, { "name": "arg3", "type": "int64" }], "name": "Propose", "topic": 2, "type": "Event" }, { "anonymous": false, "input": [{ "name": "topic", "type": "FixedHash<20>" }, { "name": "arg1", "type": "string" }], "name": "Approve", "topic": 1, "type": "Event" }, { "anonymous": false, "input": [{ "name": "topic", "type": "FixedHash<20>" }, { "name": "arg1", "type": "string" }], "name": "Execute", "topic": 1, "type": "Event" }, { "constant": false, "input": [{ "name": "managers", "type": "set<string>" }, { "name": "requires", "type": "uint8" }], "name": "init", "output": "void", "type": "Action" }, { "constant": false, "input": [{ "name": "proposal_name", "type": "string" }, { "name": "contract_addr", "type": "FixedHash<20>" }, { "name": "paras", "type": "uint8[]" }, { "name": "expiration", "type": "int64" }], "name": "propose", "output": "bool", "type": "Action" }, { "constant": false, "input": [{ "name": "proposal_name", "type": "string" }, { "name": "to", "type": "FixedHash<20>" }, { "name": "amount", "type": "uint128" }, { "name": "expiration", "type": "int64" }], "name": "propose_transfer", "output": "bool", "type": "Action" }, { "constant": false, "input": [{ "name": "proposal_name", "type": "string" }, { "name": "new_managers", "type": "set<string>" }, { "name": "new_requires", "type": "uint8" }, { "name": "expiration", "type": "int64" }], "name": "propose_update_managers", "output": "bool", "type": "Action" }, { "constant": false, "input": [{ "name": "proposal_name", "type": "string" }], "name": "execute", "output": "bool", "type": "Action" }, { "constant": true, "input": [], "name": "get_managers", "output": "set<string>", "type": "Action" }, { "constant": true, "input": [], "name": "get_owner", "output": "FixedHash<20>", "type": "Action" }, { "constant": true, "input": [], "name": "get_requires", "output": "uint8", "type": "Action" }, { "baseclass": [], "fields": [{ "name": "expiration", "type": "int64" }, { "name": "contract_addr", "type": "FixedHash<20>" }, { "name": "paras", "type": "uint8[]" }, { "name": "approvers", "type": "set<string>" }], "name": "GeneralProposal", "type": "struct" }, { "baseclass": [], "fields": [{ "name": "expiration", "type": "int64" }, { "name": "to", "type": "FixedHash<20>" }, { "name": "amount", "type": "uint128" }, { "name": "approvers", "type": "set<string>" }], "name": "TransferProposal", "type": "struct" }, { "baseclass": [], "fields": [{ "name": "requires", "type": "uint8" }, { "name": "expiration", "type": "int64" }, { "name": "managers", "type": "set<string>" }, { "name": "approvers", "type": "set<string>" }], "name": "UpdateManagersProposal", "type": "struct" }, { "baseclass": [], "fields": [{ "name": "general_proposal", "type": "GeneralProposal" }, { "name": "transfer_proposal", "type": "TransferProposal" }, { "name": "update_managers_proposal", "type": "UpdateManagersProposal" }], "name": "Proposal", "type": "struct" }, { "constant": true, "input": [{ "name": "proposal_name", "type": "string" }], "name": "get_proposal", "output": "Proposal", "type": "Action" }];
const MultisigContractAddress = "lat149jm4epvn9rk759qvzghyhemsphf0qa52lk6el";                          // multisig address
const LockContract = new web3.platon.Contract(LockContractAbi, LockContractAddress, { vmType: 1 });
const MultisigConstract = new web3.platon.Contract(MultisigContractAbi, MultisigContractAddress, { vmType: 1 });

const Manager1PrivateKey = '0x978c6b5b7504674d10b3548669c739acf5bf69041f69374d188d9dbe1d3ce204';
const Manager1Address = 'lat1q949tup3qkgdvu223qu5yyee4knhfchp40lpgh';
const Manager2PrivateKey = '0xa5da67b71327332f8a22c39d472089d3f30a1f7d30e2528d710c53beae703eaa';
const Manager2Address = 'lat17jemcasgq2vdq0urysvldn84q7dxe3ekrlhf39';
const Manager3PrivateKey = '0xcfa83bd35a6607c319722d9539b2fe9910270328fc1839e0a9c1c20310d6c9cf';
const Manager3Address = 'lat182966a4jv369w9wss6lqk07wlxagv84tjmk87z';
const AttackPrivateKey = '0x63d5958d8098c0a206b2a300913ff9295de5b3f1e2600c71463e7dc3f0929b09';
// const AttackAddress = 'lat1c9s7qxxljhh2rhy48njr0pluxw960f6ge0lyj7';
const LockAmount = '1000000000000000000000';
const UnlockAmount = '1000000000000000000';

// 通过私钥签名交易
async function signTransaction(contract, actionName, privateKey, paramsArray) {
  let from = web3.platon.accounts.privateKeyToAccount(privateKey).address; // 私钥导出公钥
  let nonce = web3.utils.numberToHex(await web3.platon.getTransactionCount(from)); // 获取 生成 nonce
  let data = contract.methods[actionName].apply(contract.methods, paramsArray).encodeABI(); // encode ABI
  // 准备交易数据
  let tx = {
    from: from,
    to: contract._address,
    value: 0,
    chainId: 210309,
    data: data,
    nonce: nonce,
    gas: "2000000"
  };

  // 签名交易
  let signTx = await web3.platon.accounts.signTransaction(tx, privateKey);
  return signTx;
};

// 合约的执行接口
describe('Lock Contract Action of set_lock_info Test Cases', () => {
  // 测试 manager 账户发起设置锁仓账户信息的多签提案
  let proposalName = "SetLockInfo";
  let expireTime = 0;
  describe('Propose call lock contract to set lock account info', async() => {
    it("Transaction status should equal true", async function () {
      this.timeout(0);
      let lockInfo = [
        [Manager1Address, LockAmount],
        [Manager2Address, LockAmount],
        [Manager3Address, LockAmount]
      ];
      let setLockInfoParas = LockContract.methods.set_lock_info(lockInfo).encodeABI();
      let setLockInfoParasBytes = web3.utils.hexToBytes(setLockInfoParas);
      const signTx = await signTransaction(MultisigConstract, "propose", Manager1PrivateKey, [proposalName, LockContractAddress, setLockInfoParasBytes, expireTime]);

      // 发送交易
      const receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;
    });
  });

  // 测试 manager approve 提案
  describe('Approve call lock contract', () => {
    it("Approve " + proposalName + ", status should equal true", async function () {
      this.timeout(0);

      // manager2 发送 approve 交易
      let signTx = await signTransaction(MultisigConstract, "approve", Manager2PrivateKey, [proposalName]);
      let receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;

      // manager3 发送 approve 交易
      signTx = await signTransaction(MultisigConstract, "approve", Manager3PrivateKey, [proposalName]);
      receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;
    });
  });

  // 测试执行多签提案
  describe('Execute call lock contract', () => {
    it("Execute proposal " + proposalName + ", status should equal true", async function () {
      this.timeout(0);
      const signTx = await signTransaction(MultisigConstract, "execute", Manager1PrivateKey, [proposalName]);

      // 发送交易
      const receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;
    });
  });
  
});

describe('Lock Contract Action of Unlock Test Cases', () => {
  // 测试 manager 账户发起解锁的多签提案
  let proposalName = "Unlock";
  let expireTime = 0;
  describe('Propose call lock contract to unlock', async() => {
    it("Transaction status should equal true", async function () {
      this.timeout(0);;
      let unlockParas = LockContract.methods.unlock(Manager1Address, UnlockAmount).encodeABI();
      let unlockParasBytes = web3.utils.hexToBytes(unlockParas);
      const signTx = await signTransaction(MultisigConstract, "propose", Manager1PrivateKey, [proposalName, LockContractAddress, unlockParasBytes, expireTime]);

      // 发送交易
      const receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;
    });
  });

  // 测试 manager approve 提案
  describe('Approve call lock contract', () => {
    it("Approve " + proposalName + ", status should equal true", async function () {
      this.timeout(0);

      // manager2 发送 approve 交易
      let signTx = await signTransaction(MultisigConstract, "approve", Manager2PrivateKey, [proposalName]);
      let receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;

      // manager3 发送 approve 交易
      signTx = await signTransaction(MultisigConstract, "approve", Manager3PrivateKey, [proposalName]);
      receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;
    });
  });

  // 测试执行多签提案
  describe('Execute call lock contract', () => {
    it("Execute proposal " + proposalName + ", status should equal true", async function () {
      this.timeout(0);
      const signTx = await signTransaction(MultisigConstract, "execute", Manager1PrivateKey, [proposalName]);

      // 发送交易
      const receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;
    });
  });
});

// 测试修改 prc20Address
describe('Lock Contract Action of set_prc20_address Test Cases', () => {
  // 测试 manager 账户发起解锁的多签提案
  let proposalName = "SetPrc20Address";
  let expireTime = 0;
  let prc20Address = 'lat1hzan4ed929nh9mnua7zht0erzrcxuj5q24a0gt';
  describe('Propose call lock contract to set prc20 address', async() => {
    it("Transaction status should equal true", async function () {
      this.timeout(0);;
      let setPrc20Paras = LockContract.methods.set_prc20_address(prc20Address).encodeABI();
      let setPrc20ParasBytes = web3.utils.hexToBytes(setPrc20Paras);
      let signTx = await signTransaction(MultisigConstract, "propose", Manager1PrivateKey, [proposalName, LockContractAddress, setPrc20ParasBytes, expireTime]);

      // 发送交易
      let receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("propose transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;
      
      // manager2 发送 approve 交易
      signTx = await signTransaction(MultisigConstract, "approve", Manager2PrivateKey, [proposalName]);
      receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("approve transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;

      // manager3 发送 approve 交易
      signTx = await signTransaction(MultisigConstract, "approve", Manager3PrivateKey, [proposalName]);
      receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("approve transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;
      
      // 执行多签提案，完成修改 Prc20Address
      signTx = await signTransaction(MultisigConstract, "execute", Manager1PrivateKey, [proposalName]);
      receipt = await web3.platon.sendSignedTransaction(signTx.rawTransaction);
      console.log("execute transaction id: " + receipt.transactionHash, ", transaction status: " + receipt.status);
      expect(receipt.status).to.true;

      // 检测是否修改成功
      LockContract.methods.get_prc20_address().call(null, (error, result) => {
        expect(result).to.equal(prc20Address);
      });
    });
  });
});

// 合约安全性测试
describe('Lock Contract of Security Test Cases', () => {
  describe('Call lock contract to set_lock_info', async() => {
    it("Transaction status should equal false", async function () {
      this.timeout(0);
      let lockInfo = [
        [Manager1Address, LockAmount],
        [Manager2Address, LockAmount],
        [Manager3Address, LockAmount]
      ];
      const signTx = await signTransaction(LockContract, "set_lock_info", AttackPrivateKey, [lockInfo]);
      try {
        await web3.platon.sendSignedTransaction(signTx.rawTransaction);
        expect(1).to.equal(0);
      } catch (error) {
        console.log("transaction id: " + error.receipt.transactionHash, ", transaction status: " + error.receipt.status);
        expect(error).to.an("Error");
      }
    });
  });

  describe('Call lock contract to unlock', async() => {
    it("Transaction status should equal false", async function () {
      this.timeout(0);
      const signTx = await signTransaction(LockContract, "unlock", AttackPrivateKey, [Manager1Address, UnlockAmount]);
      try {
        await web3.platon.sendSignedTransaction(signTx.rawTransaction);
        expect(1).to.equal(0);
      } catch (error) {
        console.log("transaction id: " + error.receipt.transactionHash, ", transaction status: " + error.receipt.status);
        expect(error).to.an("Error");
      }
    });
  });

  describe('Call lock contract to change Prc20 address', async() => {
    it("Transaction status should equal false", async function () {
      this.timeout(0);
      let prc20Address = "lat1zf9vh3s63ux2nraaqyl0zmp52kdt5e2j6ylwe4";
      const signTx = await signTransaction(LockContract, "set_prc20_address", AttackPrivateKey, [prc20Address]);
      try {
        await web3.platon.sendSignedTransaction(signTx.rawTransaction);
        expect(1).to.equal(0);
      } catch (error) {
        console.log("transaction id: " + error.receipt.transactionHash, ", transaction status: " + error.receipt.status);
        expect(error).to.an("Error");
      }
    });
  });
});
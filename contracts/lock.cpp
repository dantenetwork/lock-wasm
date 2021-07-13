/*
 * @Description:
 * @Author: kay
 * @Date: 2021-07-09 13:55:57
 * @LastEditTime: 2021-07-12 15:47:11
 * @LastEditors: kay
 */

#include "lock.hpp"

namespace dante {

void lock::init(const Address& owner, const Address& prc20_address) {
  set_owner(owner.toString());
  prc20_address_table.self() = prc20_address;
}

bool lock::set_lock_info(const std::map<std::string, u128>& lock_info) {
  Address sender = platon_caller();
  platon_assert(sender == owner(), "lock: only owner can set.");
  locked_table.self().insert(lock_info.begin(), lock_info.end());
  return true;
}

bool lock::unlock(const Address& to, const u128& amount) {
  Address sender = platon_caller();
  platon_assert(sender == owner(), "lock: only owner can unlock.");
  std::map<std::string, u128>::iterator itr =
      locked_table.self().find(to.toString());
  platon_assert(itr != locked_table.self().end(),
                "lock: unlock account not exists.");
  platon_assert(itr->second >= amount, "lock: execced locked amount.");
  auto result = platon_call_with_return_value<int>(prc20_address_table.self(), uint32_t(0),
                            uint32_t(0), "transfer", to, amount);
  if(result.second) {
    platon_assert(result.first, "lock: call transfer failed.");
    locked_table.self()[to.toString()] -= amount;
    return result.first;
  }
  return result.second;
}

bool lock::set_prc20_address(const Address& address) {
  Address sender = platon_caller();
  platon_assert(sender == owner(), "lock: only owner can unlock.");
  prc20_address_table.self() = address;
  return true;
}

std::map<std::string, u128> lock::get_locked_info() {
  return locked_table.self();
}

std::string lock::get_owner() {
  return owner().toString();
}

std::string lock::get_prc20_address() {
  return prc20_address_table.self().toString();
}

}  // namespace dante

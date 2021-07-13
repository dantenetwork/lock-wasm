/*
 * @Description:
 * @Author: kay
 * @Date: 2021-07-09 13:55:57
 * @LastEditTime: 2021-07-13 13:58:54
 * @LastEditors: kay
 */

#undef NDEBUG

#include <platon/platon.hpp>

using namespace platon;
namespace dante {

CONTRACT lock : public Contract {
 public:
  ACTION void init(const Address& owner, const Address& prc20_address);
  CONST std::map<std::string, u128> get_locked_info();
  CONST std::string get_owner();
  CONST std::string get_prc20_address();

  ACTION bool set_lock_info(const std::map<std::string, u128>& lock_info);
  ACTION bool unlock(const Address& to, const u128& amout);
  ACTION bool set_prc20_address(const Address& address);

 protected:
  StorageType<"prc20_address"_n, Address> prc20_address_table;
  StorageType<"locked_info"_n, std::map<std::string, u128> > locked_table;
};

PLATON_DISPATCH(
    lock,
    (init)(get_locked_info)(set_lock_info)(unlock)(get_owner)(get_prc20_address)(set_prc20_address))

}  // namespace dante
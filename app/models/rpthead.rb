$:<<::File.dirname(__FILE__)

class Rpthead < Sequel::Model(:rpthead)
  set_primary_key [:rptno]
end

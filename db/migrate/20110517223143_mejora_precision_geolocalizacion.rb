class MejoraPrecisionGeolocalizacion < ActiveRecord::Migration
  def self.up
    change_table :jardins do |t|
      t.change :latitud, :decimal, :precision => 15, :scale => 10
      t.change :longitud, :decimal, :precision => 15, :scale => 10
    end
  end

  def self.down
  end
end

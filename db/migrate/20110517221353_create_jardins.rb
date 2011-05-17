class CreateJardins < ActiveRecord::Migration
  def self.up
    create_table :jardins do |t|
      t.string :nombre
      t.string :direccion
      t.string :telefono
      t.string :web
      t.string :email
      t.integer :capacidad
      t.integer :camaras
      t.float :ninos_x_tia
      t.integer :matricula
      t.integer :mensualidad
      t.string :sistema_educativo
      t.string :edad_entrada
      t.string :edad_salida
      t.string :horario
      t.integer :vacantes
      t.float :latitud
      t.float :longitud

      t.timestamps
    end
  end

  def self.down
    drop_table :jardins
  end
end

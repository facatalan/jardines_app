# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110517223143) do

  create_table "jardins", :force => true do |t|
    t.string   "nombre"
    t.string   "direccion"
    t.string   "telefono"
    t.string   "web"
    t.string   "email"
    t.integer  "capacidad"
    t.integer  "camaras"
    t.float    "ninos_x_tia"
    t.integer  "matricula"
    t.integer  "mensualidad"
    t.string   "sistema_educativo"
    t.string   "edad_entrada"
    t.string   "edad_salida"
    t.string   "horario"
    t.integer  "vacantes"
    t.decimal  "latitud",           :precision => 15, :scale => 10
    t.decimal  "longitud",          :precision => 15, :scale => 10
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
